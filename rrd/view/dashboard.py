#-*- coding:utf-8 -*-
from flask import render_template
from rrd import app

@app.route("/dashboard")
def dashboard():
    return render_template("index.html", **locals())
