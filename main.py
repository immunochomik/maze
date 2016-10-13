from flask import Flask, url_for, render_template
import cv2
import json
app = Flask(__name__)
app.config['DEBUG'] = True

# Note: We don't need to call run() since our application is embedded within
# the App Engine WSGI application server.


@app.route('/')
def home():
    """Return a friendly HTTP greeting."""
    return render_template('home.html');


@app.route('/test')
def test():
    """Return a friendly HTTP greeting."""
    return 'Test';



@app.route('/image', methods=['GET', 'POST', 'PUT'])
def get_edges():
    """Post inage and return edges base foe maze"""
    img = cv2.imread('gate-6.jpg',0)
    edges = cv2.Canny(img,0,200)
    ret = []
    for row in edges:
        ret_row = []
        for point in row:
            ret_row.append('0' if str(point) == '0' else '1')
        ret.append(ret_row)
    resp = flask.Response()
    resp.headers['Content-Type'] = 'application/json'
    return json.dumps(ret)


@app.errorhandler(404)
def page_not_found(e):
    """Return a custom 404 error."""
    return 'Sorry, nothing at this URL.', 404
