# pmarchive
pmarchive.com

# First time installation
 1. Clone repository onto local machine
 2. `$ cd` into project directory
 3. `$ npm install`
 4. run `$ virtualenv venv`
 5. `$ source venv/bin/activate`
 6. `$ pip install -r requirements.txt`
 7. `$ python app.py` will start a webserver on port `5000` - see `localhost:5000`


# Running the server
 1. `$ export FLASK_DEBUG=1` this reruns itself on code changes rather than having to manually restart the server every time you make a change
 2. `$ python app.py` will start a webserver on port `5000` - see `localhost:5000`

# Compiling SCSS
 1. For dev `$ npm run sass:watch`
 2. For prod `$ npm run sass:compile`
