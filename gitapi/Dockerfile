FROM python

RUN pip3 install flask
RUN mkdir -p /jupgit/gitapi
COPY *py /jupgit/gitapi/

EXPOSE 8889
ENV PYTHONPATH /jupgit
ENV FLASK_APP /jupgit/gitapi/__main__.py
ENTRYPOINT ["flask", "run", "--host=0.0.0.0", "--port=8889"]
