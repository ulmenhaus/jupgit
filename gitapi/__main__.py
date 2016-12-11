"""
Module to invoke gitapi as flask APP
"""

import logging
import os
import time

from gitapi.api import API

app = API().app  # pylint: disable=invalid-name
