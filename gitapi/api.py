import json

from flask import Flask, request

from gitapi import git


class API(object):
    def __init__(self):
        self.app = Flask(__name__)
        self.app.route('/gitapi/log')(self.get_log)
        self.app.route('/gitapi/info')(self.get_info)

    def get_log(self):
        return json.dumps(git.get_log(), indent=4)

    def get_info(self):
        return json.dumps(git.get_info(), indent=4)
