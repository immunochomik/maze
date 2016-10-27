from flask import Flask, request, url_for, render_template, flash, redirect
from flask import Response
import json
import os
from werkzeug.utils import secure_filename
import pprint
import imghdr
import cv2
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
application.secret_key = "super secret key"
ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg', 'gif'])
application.config['UPLOAD_FOLDER'] = 'var/tmp/'

def resize(im, max_width):
    w, h = im.shape[:2]
    return cv2.resize(im, (max_width, (max_width * w)/h))

def get_edges(file_name, max_width = 500):
    """ takes path to an image, resizes it and performs canny edge
    detection and formats to list of lists with 1 or 0 """
    im = resize(cv2.imread(file_name, 0), max_width)
    edges = cv2.Canny(im,0,200)
    ret = []
    for row in edges:
        ret_row = []
        for point in row:
            ret_row.append(1 if point == 0 else 0)
        ret.append(ret_row)
    return ret

def allowed_file(filename):
    return '.' in filename and \
        filename.rsplit('.', 1)[1] in ALLOWED_EXTENSIONS

@application.route('/')
def home():
    """Return a friendly HTTP greeting."""
    base = get_edges(APP_ROOT +'/static/images/index.jpeg');
    return render_template('home.html', base=base)


@application.route('/test')
def test():
    """Return a friendly HTTP greeting."""
    return 'Test'



@application.route('/image', methods=['GET', 'POST', 'PUT'])
def get_image():
    """Post inage and return edges base foe maze"""
    if 'image' not in request.files:
        flash('No file part')
        return redirect('/')
    file = request.files['image']
    # if user does not select file, browser also
    # submit a empty part without filename
    if file.filename == '':
        flash('No selected file')
        return redirect('/')
    if not allowed_file(file.filename.lower()):
        flash('file extension not allowed for file ' + file.filename)
        return redirect('/')
    filename = secure_filename(file.filename)
    path = os.path.join(
        application.config['path'],
        application.config['UPLOAD_FOLDER'],
        filename)
    file.save(path)
    # check it the file is an actual image
    if not imghdr.what(path):
        flash('File is not an image')
        os.remove(path)
        return redirect('/')
    base = get_edges(path)
    os.remove(path)
    return render_template('home.html', base=base)



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
