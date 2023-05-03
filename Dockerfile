FROM python:3.8
ENV PYTHONPATH=/app
WORKDIR /app
COPY . /app
RUN pip install --no-cache-dir -r requirements.txt
EXPOSE 8080
CMD ["python", "web.py"]
