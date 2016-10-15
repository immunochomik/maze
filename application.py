from flask import Flask, url_for, render_template
from flask import Response
import json
application = Flask(__name__)
application.config['DEBUG'] = True

# Note: We don't need to call run() since our applicationlication is embedded within
# the application Engine WSGI applicationlication server.


@application.route('/')
def home():
    """Return a friendly HTTP greeting."""
    return render_template('home.html');


@application.route('/test')
def test():
    """Return a friendly HTTP greeting."""
    return 'Test';



@application.route('/image', methods=['GET', 'POST', 'PUT'])
def get_edges():
    """Post inage and return edges base foe maze"""
    try:
        import cv2
    except Exception as e:
        return 'Can not inmport cv2'
    img = cv2.imread('gate-6.jpg',0)
    edges = cv2.Canny(img,0,200)
    ret = []
    for row in edges:
        ret_row = []
        for point in row:
            ret_row.append('0' if str(point) == '0' else '1')
        ret.append(ret_row)
    resp = Response()
    resp.headers['Content-Type'] = 'applicationlication/json'
    return json.dumps(ret)


@application.errorhandler(404)
def page_not_found(e):
    """Return a custom 404 error."""
    return 'Sorry, nothing at this URL.', 404


if __name__ == "__main__":
    # Setting debug to True enables debug output. This line should be
    # removed before deploying a production application.
    application.debug = True
    application.run()

    #seven3dope1
