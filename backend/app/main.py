from fastapi import FastAPI, UploadFile, File

app = FastAPI()

@app.post("/upload")
async def recieveFile(file: UploadFile):
  content = await file.read()
  return {"size": len(content)}

@app.get("/")
def root():
    return {"message": "Hello from backend"}

  
    