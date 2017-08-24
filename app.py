from flask import Flask, render_template
app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/startups')
def startups():
    return render_template('startups.html')


if __name__ == '__main__':
    app.run()
