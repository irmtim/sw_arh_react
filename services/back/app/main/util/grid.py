from functools import wraps
from typing import Callable

from flask import request


def grid_paginate(f) -> Callable:
    @wraps(f)
    def decorated(*args, **kwargs):
        page = request.form.get('page')
        items_per_page = request.form.get('items_per_page')
        sort = request.form.get('sort')
        order = request.form.get('order')
        search = request.form.get('search')
        
        
        
        return f(*args, **kwargs)

    return decorated