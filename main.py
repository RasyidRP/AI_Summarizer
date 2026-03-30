from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import TypedDict
from langchain_ollama import OllamaLLM
from langchain_core.prompts import PromptTemplate
from langgraph.graph import StateGraph, END

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class GraphState(TypedDict):
    input_text: str
    summary: str

llm = OllamaLLM(model="llama3.2")

def summarize_node(state: GraphState):
    prompt = PromptTemplate.from_template(
        "Summarize the following text into exactly two punchy sentences:\n\n{text}"
    )
    chain = prompt | llm
    result = chain.invoke({"text": state["input_text"]})
    return {"summary": result}

workflow = StateGraph(GraphState)
workflow.add_node("summarize", summarize_node)
workflow.set_entry_point("summarize")
workflow.add_edge("summarize", END)
app_graph = workflow.compile()

class RequestData(BaseModel):
    text: str

@app.post("/api/summarize")
async def api_summarize(request: RequestData):
    initial_state = {"input_text": request.text, "summary": ""}
    result = app_graph.invoke(initial_state)
    return {"summary": result["summary"]}
