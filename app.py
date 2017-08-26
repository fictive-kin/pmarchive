from flask import Flask, render_template
app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/pmarca-guide-to-startups')
def startup_guide():
    return render_template('startup-guide.html')


if __name__ == '__main__':
    app.run()
