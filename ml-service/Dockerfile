
FROM python:3.10-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV PIP_INDEX_URL=https://mirrors.ustc.edu.cn/pypi/simple/
ENV PIP_DEFAULT_TIMEOUT=30
ENV PIP_RETRIES=2

WORKDIR /app

COPY requirements.txt .

RUN python -m pip install --no-cache-dir \
    torch==2.14.1 torchvision==0.29.1 \
    --index-url https://download.pytorch.org/whl/cpu \
    --extra-index-url https://mirrors.ustc.edu.cn/pypi/simple/ \
    --timeout 30 --retries 2

RUN python -m pip install --no-cache-dir -r requirements.txt

COPY model.py predict.py app.py ./
COPY artifacts/ ./artifacts/

EXPOSE 8000

CMD ["python", "-m", "uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]
