#-*- coding:utf-8 -*-
import json
import time
import random
import urllib2
import string
from flask import request, abort, g
from rrd import app
from rrd import config

from rrd.model.tag_endpoint import TagEndpoint
from rrd.model.endpoint import Endpoint
from rrd.model.endpoint_counter import EndpointCounter
from rrd.model.graph import TmpGraph
from rrd.consts import RRD_CFS, GRAPH_TYPE_KEY, GRAPH_TYPE_HOST

@app.route("/api/endpoints")
def api_endpoints():
    ret = {
        "ok": False,
        "msg": "",
        "data": [],
    }

    q = request.args.get("q") or ""
    raw_tag = request.args.get("tags") or ""
    tags = raw_tag and [x.strip() for x in raw_tag.split(",")] or []
    limit = int(request.args.get("limit") or 100)

    if not q and not tags:
        ret["msg"] = "no query params given"
        return json.dumps(ret)
    
    endpoints = []

    if tags and q:
        endpoint_ids = TagEndpoint.get_endpoint_ids(tags, limit=limit) or []
        endpoints = Endpoint.search_in_ids(q.split(), endpoint_ids)
    elif tags:
        endpoint_ids = TagEndpoint.get_endpoint_ids(tags, limit=limit) or []
        endpoints = Endpoint.gets(endpoint_ids)
    else:
        endpoints = Endpoint.search(q.split(), limit=limit)

    endpoints_str = [x.endpoint for x in endpoints]
    endpoints_str.sort()
    ret['data'] = endpoints_str
    ret['ok'] = True

    return json.dumps(ret)

@app.route("/api/endpoints/<string:type>", methods=["GET"])
def api_endpoints_type(type):
    ret = {
        "ok": False,
        "msg": "",
        "data": [],
    }

    endpoints = Endpoint.search_type(type)

    endpoints_str = [x.endpoint for x in endpoints]
    endpoints_str.sort()
    ret['data'] = endpoints_str
    ret['ok'] = True

    return json.dumps(ret)

@app.route("/api/clusters/<string:type>", methods=["GET"])
def api_endpoints_cluster(type):
    ret = {
        "ok": False,
        "msg": "",
        "data": [],
    }

    clusters = Endpoint.search_cluster(type)

    clusters_str = [x.endpoint for x in clusters]
    clusters_str.sort()
    ret['data'] = clusters_str
    ret['ok'] = True

    return json.dumps(ret)

@app.route("/api/endpoints/group/<string:cluster>", methods=["GET"])
def get_endpoints_by_cluster(cluster):
    ret = {
        "ok": False,
        "msg": "",
        "data": [],
    }

    endpoints = Endpoint.search_endpoint_by_cluster(cluster)

    endpoints_str = [x.endpoint for x in endpoints]
    endpoints_str.sort()
    ret['data'] = endpoints_str
    ret['ok'] = True

    return json.dumps(ret)

@app.route("/api/endpoints/groupscore/<string:cluster>", methods=["GET"])
def get_groupscore_by_cluster(cluster):
    ret = {
        "ok": False,
        "msg": "",
        "data": [],
    }

    endpoints = Endpoint.search_agent_endpoint_by_cluster(cluster)
    score = 0
    for endpoint in endpoints:
	p = []
	q = {
	    "endpoint": endpoint.endpoint,
	    "counter": "net.port.listen/port=%s"%endpoint.id
	}
	p.append(q)
        method = "POST"
        handler = urllib2.HTTPHandler()
        opener = urllib2.build_opener(handler)
        url = config.QUERY_ADDR + "/graph/last"
        # print ("post data==>>>%s"%json.dumps(p))
        request = urllib2.Request(url, data=json.dumps(p))
        request.add_header("Content-Type", "application/json")
        request.get_method = lambda: method
        try:
            connection = opener.open(request)
        except urllib2.HTTPError,e:
            connection = e

        # check. Substitute with appropriate HTTP code.
        if connection.code == 200:
            msg = connection.read()
	    jsonmsg = json.loads(msg)
	    value = jsonmsg[0]["value"]["value"]
	    score = score + int(value)
	    #j = {
	    #	"endpoint": endpoint.endpoint,
	    #	"value": score
	    #}
	    ret['ok'] = True
        else:
            print '{"err":1,"msg":"%s"}' % connection
            ret['ok'] = False

    if len(endpoints):
	ret['data'].append(score*100/len(endpoints))
        ret['data'].append(len(endpoints))
    else:
	ret["data"].append(0)
    return json.dumps(ret)

@app.route("/api/endpoints/memscore/<string:cluster>", methods=["GET"])
def get_memscore_by_cluster(cluster):
    ret = {
        "ok": False,
        "msg": "",
        "data": [],
    }

    endpoints = Endpoint.search_httpapi_by_cluster(cluster)

    score = 100
    for x in endpoints:
	url = x.endpoint
	
    	method = "GET"
        handler = urllib2.HTTPHandler()
        opener = urllib2.build_opener(handler)
        url = url + "/page/memory"
        request = urllib2.Request(url)
        request.add_header("Content-Type",'application/json')
        request.get_method = lambda: method
        try:
            connection = opener.open(request)
        except urllib2.HTTPError,e:
            connection = e

        # check. Substitute with appropriate HTTP code.
        if connection.code == 200:
            msg = connection.read()
            # print ("msg===>>>" + msg)
            jsonmsg = json.loads(msg)
            if jsonmsg["msg"]=="success":
                if jsonmsg["data"]:
                    x = jsonmsg["data"][1]
                    y = jsonmsg["data"][0]
                    a = x/float(y)
                    if a > 0.2:
                        score = score - 10
            else:
                score = score - 20
            ret['ok'] = True
        else:
            print '{"err":1,"msg":"%s"}' % connection
            ret['ok'] = False
    if ret['ok'] == True:
        ret['data'].append(score)
    else:
        ret['data'] = []
    return json.dumps(ret)

@app.route("/api/endpoints/dfscore/<string:cluster>", methods=["GET"])
def get_dfscore_by_cluster(cluster):
    ret = {
        "ok": False,
        "msg": "",
        "data": [],
    }

    endpoints = Endpoint.search_httpapi_by_cluster(cluster)

    score = 100
    for x in endpoints:
        url = x.endpoint

        method = "GET"
        handler = urllib2.HTTPHandler()
        opener = urllib2.build_opener(handler)
        url = url + "/page/df"
        request = urllib2.Request(url)
        request.add_header("Content-Type",'application/json')
        request.get_method = lambda: method
        try:
            connection = opener.open(request)
        except urllib2.HTTPError,e:
            connection = e

        # check. Substitute with appropriate HTTP code.
        if connection.code == 200:
            msg = connection.read()
            # print ("msg===>>>" + msg)
            jsonmsg = json.loads(msg)
            if jsonmsg["msg"]=="success":
                if jsonmsg["data"]:
		    for d in jsonmsg["data"]:
                        x = float(d[4].replace("%", ""))/100
		        if x > 0.2:
                            score = score - 5
            else:
                score = score - 20
            ret['ok'] = True
        else:
            print '{"err":1,"msg":"%s"}' % connection
            ret['ok'] = False
    if ret['ok'] == True:
        ret['data'].append(score)
    else:
        ret['data'] = []
    return json.dumps(ret)

@app.route("/api/endpoints/counterscore", methods=["POST"])
def get_counterscore():
    ret = {
        "ok": False,
        "msg": "",
        "data": [],
    }
    
    cluster = request.form.get("cluster") or ""
    counter = request.form.get("counter") or ""
    endpoints = Endpoint.search_endpoint_by_cluster(cluster)

    score = 100
    for x in endpoints:
        method = "POST"
        handler = urllib2.HTTPHandler()
        opener = urllib2.build_opener(handler)
        url = config.QUERY_ADDR + "/graph/last"
	port = 0
	p = []
	if x.id!="None":
	    port = x.id
	else:
	    port = 3306
	q = {
	    "endpoint": x.endpoint,
	    "counter": (counter + "%s")%port
	}
	p.append(q)
        request1 = urllib2.Request(url, data=json.dumps(p))
        request1.add_header("Content-Type",'application/json')
        request1.get_method = lambda: method
        try:
            connection = opener.open(request1)
        except urllib2.HTTPError,e:
            connection = e

        # check. Substitute with appropriate HTTP code.
        if connection.code == 200:
            msg = connection.read()
            # print ("msg===>>>" + msg)
            jsonmsg = json.loads(msg)
            if jsonmsg[0]["value"]:
                if jsonmsg[0]["value"]["value"]:
                    f = float(jsonmsg[0]["value"]["value"])
		    if f > 5: 
			score = score -10
            ret['ok'] = True
        else:
            print '{"err":1,"msg":"%s"}' % connection
            ret['ok'] = False
    if ret['ok'] == True:
        ret['data'].append(score)
    else:
        ret['data'] = []
    return json.dumps(ret)

@app.route("/api/endpoints/counterscoreNp", methods=["POST"])
def get_counterscoreNp():
    ret = {
        "ok": False,
        "msg": "",
        "data": [],
    }
    
    cluster = request.form.get("cluster") or ""
    counter = request.form.get("counter") or ""
    endpoints = Endpoint.search_endpoint_by_cluster(cluster)

    score = 100
    for x in endpoints:
        method = "POST"
        handler = urllib2.HTTPHandler()
        opener = urllib2.build_opener(handler)
        url = config.QUERY_ADDR + "/graph/last"
        p = []
        q = {
            "endpoint": x.endpoint,
            "counter": counter
        }
        p.append(q)
        request1 = urllib2.Request(url, data=json.dumps(p))
        request1.add_header("Content-Type",'application/json')
        request1.get_method = lambda: method
        try:
            connection = opener.open(request1)
        except urllib2.HTTPError,e:
            connection = e

        # check. Substitute with appropriate HTTP code.
        if connection.code == 200:
            msg = connection.read()
            # print ("msg===>>>" + msg)
            jsonmsg = json.loads(msg)
            if jsonmsg[0]["value"]:
                if jsonmsg[0]["value"]["value"]:
                    f = float(jsonmsg[0]["value"]["value"])
                    if f > 5: 
                        score = score -10
            ret['ok'] = True
        else:
            print '{"err":1,"msg":"%s"}' % connection
            ret['ok'] = False
    if ret['ok'] == True:
        ret['data'].append(score)
    else:
        ret['data'] = []
    return json.dumps(ret)

@app.route("/api/counters", methods=["POST"])
def api_get_counters():
    ret = {
        "ok": False,
        "msg": "",
        "data": [],
    }
    endpoints = request.form.get("endpoints") or ""
    endpoints = endpoints and json.loads(endpoints)
    
    q = request.form.get("q") or ""
    limit = int(request.form.get("limit") or 100)

    if not (endpoints or q):
        ret['msg'] = "no endpoints or counter given"
        return json.dumps(ret)

    endpoint_objs = Endpoint.gets_by_endpoint(endpoints)
    endpoint_ids = [x.id for x in endpoint_objs]
    if not endpoint_ids:
        ret['msg'] = "no endpoints in graph"
        return json.dumps(ret)

    if q:
        qs = q.split()
        ecs = EndpointCounter.search_in_endpoint_ids(qs, endpoint_ids, limit=limit)
    else:
        ecs = EndpointCounter.gets_by_endpoint_ids(endpoint_ids, limit=limit)

    if not ecs:
        ret["msg"] = "no counters in graph"
        return json.dumps(ret)
    
    counters_map = {}
    for x in ecs:
        counters_map[x.counter] = [x.counter, x.type_, x.step]
    sorted_counters = sorted(counters_map.keys())
    sorted_values = [counters_map[x] for x in sorted_counters]

    ret['data'] = sorted_values
    ret['ok'] = True

    return json.dumps(ret)

@app.route("/api/tmpgraph", methods=["POST",])
def api_create_tmpgraph():
    d = request.data
    jdata = json.loads(d)
    endpoints = jdata.get("endpoints") or []
    counters = jdata.get("counters") or []
    id_ = TmpGraph.add(endpoints, counters)

    ret = {
        "ok": False,
        "id": id_,
    }
    if id_:
        ret['ok'] = True
        return json.dumps(ret)
    else:
        return json.dumps(ret)

@app.route("/api/endpoint/detail", methods=["POST"])
def get_endpoint_detail():
    ret = {
        "ok": False,
        "msg": "",
        "data": [],
    }

    endpoint0 = request.form.get("endpoint") or ""
    qparam = request.form.getlist("q[]") or []
    print qparam
    qtype = request.form.get("type") or ""
    endpoints = Endpoint.search_agent_and_httpapi_by_endpoint(endpoint0)
    for endpoint in endpoints:
	if 'port' in qparam:
            p = []
            q = {
                "endpoint": endpoint.endpoint,
                "counter": "net.port.listen/port=%s"%endpoint.id
            }
            p.append(q)
            method = "POST"
            handler = urllib2.HTTPHandler()
            opener = urllib2.build_opener(handler)
            url = config.QUERY_ADDR + "/graph/last"
            request1 = urllib2.Request(url, data=json.dumps(p))
            request1.add_header("Content-Type", "application/json")
            request1.get_method = lambda: method
            try:
                connection = opener.open(request1)
            except urllib2.HTTPError,e:
                connection = e

            # check. Substitute with appropriate HTTP code.
            if connection.code == 200:
                msg = connection.read()
                jsonmsg = json.loads(msg)
                value = jsonmsg[0]["value"]["value"]
                score = int(value)
                j = []
	        j.append('port')
	        j.append(score)
                ret['data'].append(j)
	        ret['ok'] = True
		qparam.remove('port')
            else:
                print '{"err":1,"msg":"%s"}' % connection
                ret['ok'] = False
	
	# memory
	if (ret['ok'] and 'memory' in qparam):
            http_api = endpoint.ts
            method = "GET"
            handler = urllib2.HTTPHandler()
            opener = urllib2.build_opener(handler)
            request2 = urllib2.Request(http_api + "/page/memory")
            request2.add_header("Content-Type",'application/json')
            request2.get_method = lambda: method
            try:
                connection = opener.open(request2)
            except urllib2.HTTPError,e:
                connection = e

            # check. Substitute with appropriate HTTP code.
            if connection.code == 200:
                msg = connection.read()
                jsonmsg = json.loads(msg)
                if jsonmsg["msg"]=="success":
                    if jsonmsg["data"]:
                        x = jsonmsg["data"][1]
                        y = jsonmsg["data"][0]
                        a = "%.2f"%(x*100/float(y))
                        j = []
                        j.append('memory')
                        j.append(a + '%')
			
                        ret['data'].append(j)
			qparam.remove('memory')
                else:
                    ret['ok'] = False
                    break
            else:
                print '{"err":1,"msg":"%s"}' % connection
                ret['ok'] = False
	
	# df
        if (ret['ok'] and 'df' in qparam):
            http_api = endpoint.ts
            method = "GET"
            handler = urllib2.HTTPHandler()
            opener = urllib2.build_opener(handler)
            request3 = urllib2.Request(http_api + "/page/df")
            request3.add_header("Content-Type",'application/json')
            request3.get_method = lambda: method
            try:
                connection = opener.open(request3)
            except urllib2.HTTPError,e:
                connection = e

            # check. Substitute with appropriate HTTP code.
            if connection.code == 200:
                msg = connection.read()
                jsonmsg = json.loads(msg)
		x = []
		x.append('df')
                if jsonmsg["msg"]=="success":
                    if jsonmsg["data"]:
                        if jsonmsg["data"]:
                            for d in jsonmsg["data"]:
				j = []
                        	j.append(d[0])
                        	j.append(d[4])
				x.append(j)
                else:
                    ret['ok'] = False
                    break
		ret['data'].append(x)
                qparam.remove('df')
            else:
                print '{"err":1,"msg":"%s"}' % connection
                ret['ok'] = False	
        
        # print qparam
	if ret['ok']:
            x = []
            for j in qparam:
		if qtype == "rabbitmq":
                    counter = j
                else:
                    counter = j + endpoint.id
	        y = {
	            "endpoint": endpoint0,
	            "counter": counter
	        }
	        x.append(y)
            print x
	    url = config.QUERY_ADDR
            method = "POST"
            handler = urllib2.HTTPHandler()
            opener = urllib2.build_opener(handler)
            request4 = urllib2.Request(url + "/graph/last", data=json.dumps(x))
            request4.add_header("Content-Type",'application/json')
            request4.get_method = lambda: method
            try:
                connection = opener.open(request4)
            except urllib2.HTTPError,e:
                connection = e

            # check. Substitute with appropriate HTTP code.
            if connection.code == 200:
                msg = connection.read()
                jsonmsg = json.loads(msg)
                for jm in jsonmsg:
                    t = []
		    t.append(jm["counter"])
                    t.append("%.2f" % jm["value"]["value"])
		    ret['data'].append(t)   
	    else:
                print '{"err":1,"msg":"%s"}' % connection
                ret['ok'] = False

    return json.dumps(ret)

# chart
@app.route("/api/endpoint/detail/charts", methods=["POST"])
def get_endpoint_detail_charts():
    
    counters = []
    endpoints = []
    counters0 = request.form.getlist("counters[]") or []
    graph_type = request.form.get("graph_type") or GRAPH_TYPE_HOST
    endpoint0 = request.form.get("endpoint") or ""
    qtype = request.form.get("type") or ""    
    
    endpointlist = Endpoint.search_agent_and_httpapi_by_endpoint(endpoint0)
    for endpoint in endpointlist:
	endpoints.append(endpoint.endpoint)
	for counter in counters0:
            if counter == "port":
                counters.append("net.port.listen/port=" + endpoint.id)
	    elif counter == "memory":
		counters.append("mem.memfree.percent")
	    elif counter == "df":
		counters.append("df.statistics.used.percent")
	    else:
		if (qtype == "mysql" or qtype == "redis"):
		    counters.append(counter + endpoint.id)
		else:
		    counters.append(counter)

    endpoints.append(endpoint0)
    print endpoints
    print counters
    id_ = TmpGraph.add(endpoints, counters)

    ret = {
            "ok": False,
            "id": id_,
            "params": {
                "graph_type": graph_type,
            },
    }
    if id_:
        ret['ok'] = True

    return json.dumps(ret)

@app.route("/api/group/avgscore/<string:type>", methods = ["GET"])
def get_group_avgscore(type):
    ret = {
        "ok": False,
        "msg": "",
        "data": [],
    }

    if type == "mysql":
	ret["ok"] = True
	ret["data"] = random.randint(0,100)
    elif type == "redis":
	ret["ok"] = True
	ret["data"] = random.randint(0,100)
    elif type == "rabbitmq":
	ret["ok"] = True
	ret["data"] = random.randint(0,100)
    else:
	#other type
	ret["data"] = 0

    return json.dumps(ret)

@app.route("/api/endpoint/avgscore/<string:endpoint>", methods = ["GET"])
def get_endpoint_avgscore(endpoint):
    ret = {
        "ok": False,
        "msg": "",
        "data": [],
    }

    ret["ok"] = True
    ret["data"] = random.randint(0,100)

    return json.dumps(ret)
