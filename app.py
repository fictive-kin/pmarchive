from flask import Flask, render_template, send_from_directory
app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/startups/<path:page>')
def startups(page):
    return send_from_directory('pages/startups', page)


if __name__ == '__main__':
    app.run()
