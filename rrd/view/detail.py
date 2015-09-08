#-*- coding:utf-8 -*-
from flask import render_template
from rrd import app

@app.route("/detail/<string:type>")
def detail(type):
    
    return render_template("/public/detail.html", **locals())
