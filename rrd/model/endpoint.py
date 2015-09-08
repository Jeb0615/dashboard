#-*- coding:utf-8 -*-
from rrd.store import graph_db_conn as db_conn

class Endpoint(object):
    def __init__(self, id, endpoint, ts):
        self.id = str(id)
        self.endpoint = endpoint
        self.ts = ts

    def __repr__(self):
        return "<Endpoint id=%s, endpoint=%s>" %(self.id, self.id)
    __str__ = __repr__

    @classmethod
    def search(cls, qs, start=0, limit=100, deadline=0):
        args = [deadline, ]
        for q in qs:
            args.append("%"+q+"%")
        args += [start, limit]

        sql = '''select id, endpoint, ts from endpoint where ts > %s and t_type not in (\'mysql-cluster\', \'redis-cluster\', \'rabbitmq-cluster\') '''
        for q in qs:
            sql += ''' and endpoint like %s'''
        sql += ''' limit %s,%s'''

        cursor = db_conn.execute(sql, args)
        rows = cursor.fetchall()
        cursor and cursor.close()

        return [cls(*row) for row in rows]
    
    
    @classmethod
    def search_type(cls, type, start=0, limit=100, deadline=0):
	args = [type]
	print ('type===>>%s'%type)
        sql = '''select id, endpoint, ts from endpoint where t_type = %s'''
	
	print ('search_type sql is===>>>%s'%sql)
        cursor = db_conn.execute(sql, args)
        rows = cursor.fetchall()
        cursor and cursor.close()

        return [cls(*row) for row in rows]

    @classmethod
    def search_cluster(cls, type, start=0, limit=100, deadline=0):
	try:
        	args = [type]
        	sql = '''SELECT 1, cluster_group as endpoint, 1 FROM endpoint where t_type = %s group by cluster_group HAVING cluster_group!=\'\' and cluster_group is not null'''
		
		print ('search_cluster sql is===>>>%s'%sql)
        	cursor = db_conn.execute(sql, args)
        	rows = cursor.fetchall()
        	cursor and cursor.close()
		return [cls(*row) for row in rows]
	except Exception, e:
		print e
		raise e
        return []

    @classmethod
    def search_endpoint_by_cluster(cls, cluster_group, start=0, limit=100, deadline=0):
        try:
                args = [cluster_group]
                sql = '''select port as id, endpoint, ts from endpoint where cluster_group = %s'''

                cursor = db_conn.execute(sql, args)
                rows = cursor.fetchall()
                cursor and cursor.close()
                return [cls(*row) for row in rows]
        except Exception, e:
                print e
                raise e
        return []
    
    @classmethod
    def search_agent_endpoint_by_cluster(cls, cluster_group, start=0, limit=100, deadline=0):
        try:
                args = [cluster_group]
                #sql = '''select port as id, endpoint, ts from endpoint where cluster_group = %s'''
		sql = '''SELECT t1.port AS id, t2.endpoint, t1.ts FROM endpoint t1, endpoint t2 WHERE t1.agent_id = t2.id AND t1.cluster_group = %s'''
		
                cursor = db_conn.execute(sql, args)
                rows = cursor.fetchall()
                cursor and cursor.close()
                return [cls(*row) for row in rows]
        except Exception, e:
                print e
                raise e
        return []
    
    @classmethod
    def search_agent_and_httpapi_by_endpoint(cls, endpoint):
        try:
                args = [endpoint]
                sql = '''SELECT t1.port AS id, t2.endpoint as endpoint, t1.http_api as ts FROM endpoint t1, endpoint t2 WHERE t1.agent_id = t2.id AND t1.endpoint = %s'''
                cursor = db_conn.execute(sql, args)
                rows = cursor.fetchall()
                cursor and cursor.close()
                return [cls(*row) for row in rows]
        except Exception, e:
                print e
                raise e
        return []

    @classmethod
    def search_httpapi_by_cluster(cls, cluster_group, start=0, limit=100, deadline=0):
        try:
                args = [cluster_group]
                sql = '''select id, http_api as endpoint, ts from endpoint where cluster_group = %s'''

                cursor = db_conn.execute(sql, args)
                rows = cursor.fetchall()
                cursor and cursor.close()
                return [cls(*row) for row in rows]
        except Exception, e:
                print e
                raise e
        return []

    @classmethod
    def search_in_ids(cls, qs, ids, deadline=0):
        if not ids:
            return []

        holders = ["%s" for x in ids]
        placeholder = ",".join(holders)

        args = ids + [deadline, ]
        for q in qs:
            args.append("%"+q+"%")

        sql = '''select id, endpoint, ts from endpoint where id in (''' + placeholder + ''') and ts > %s and t_type not in (\'mysql-cluster\', \'redis-cluster\', \'rabbitmq-cluster\') '''
        for q in qs:
            sql += ''' and endpoint like %s'''

        cursor = db_conn.execute(sql, args)
        rows = cursor.fetchall()
        cursor and cursor.close()

        return [cls(*row) for row in rows]

    @classmethod
    def gets_by_endpoint(cls, endpoints, deadline=0):
        if not endpoints:
            return []

        holders = ["%s" for x in endpoints]
        placeholder = ",".join(holders)
        args = endpoints + [deadline, ]

        cursor = db_conn.execute('''select id, endpoint, ts from endpoint where endpoint in (''' + placeholder + ''') and ts > %s''', args)
        rows = cursor.fetchall()
        cursor and cursor.close()

        return [cls(*row) for row in rows]

    @classmethod
    def gets(cls, ids, deadline=0):
        if not ids:
            return []

        holders = ["%s" for x in ids]
        placeholder = ",".join(holders)
        args = ids + [deadline, ]

        cursor = db_conn.execute('''select id, endpoint, ts from endpoint where t_type not in (\'mysql-cluster\', \'redis-cluster\', \'rabbitmq-cluster\') and id in (''' + placeholder + ''') and ts > %s''', args)
        rows = cursor.fetchall()
        cursor and cursor.close()

        return [cls(*row) for row in rows]
