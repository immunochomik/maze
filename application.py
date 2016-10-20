from flask import Flask, url_for, render_template
from flask import Response
import json
import os
APP_ROOT = os.path.dirname(os.path.abspath(__file__))
class CustomFlask(Flask):
    jinja_options = Flask.jinja_options.copy()
    jinja_options.update(dict(
        variable_start_string='%%',
        variable_end_string='%%',
    ))

application = CustomFlask(__name__)
application.config['DEBUG'] = True
application.config['path'] = APP_ROOT

# Note: We don't need to call run() since our applicationlication is embedded within
# the application Engine WSGI applicationlication server.
def get_edges(file_name):
    import cv2
    #img = cv2.imread(APP_ROOT + '/static/images/gate-6.jpg',0)
    #img = cv2.imread(APP_ROOT +'/static/images/afrika.png',0)
    #img = cv2.imread(APP_ROOT +'/static/images/Smiley.svg.png',0)
    #img = cv2.imread(APP_ROOT +'/static/images/europe.png',0)
    #img = cv2.imread(APP_ROOT +'/static/images/mikey.jpg',0)
    img = cv2.imread(file_name, 0)
    edges = cv2.Canny(img,0,200)
    ret = []
    for row in edges:
        ret_row = []
        for point in row:
            ret_row.append(0 if point == 0 else 1)
        ret.append(ret_row)
    return ret

@application.route('/')
def home():
    """Return a friendly HTTP greeting."""
    base = get_edges(APP_ROOT +'/static/images/afrika.png');
    return render_template('home.html', base=base);


@application.route('/test')
def test():
    """Return a friendly HTTP greeting."""
    return 'Test';



@application.route('/image', methods=['GET', 'POST', 'PUT'])
def get_image():
    """Post inage and return edges base foe maze"""



    return json.dumps({'data' :ret})


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
