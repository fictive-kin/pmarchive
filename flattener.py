from lxml.html import parse, tostring
import os
import re

script_dir = os.path.dirname(os.path.realpath(__file__))

dirs = ['additional startup guides', 'bonus awesomeness', 'bonus startup essentials', 'Guide to Startups']


for path in dirs:
    for (dirpath, dirname, filenames) in os.walk(os.path.join(script_dir, 'cleaned', path)):
        for name in filenames:
            with open(os.path.join(dirpath, name)) as f:
                with open(os.path.join(script_dir, 'cleaned', name), 'w') as f2:
                    tree = parse(f)
                    body = tostring(tree)
                    body = re.sub(r'../css', r'css', body)
                    body = re.sub(r'../home', r'home', body)
                    # body = re.sub(r'href="http://web.archive.org/web/\d+/(.*)"', r'href="\1"', body)
                    # body = re.sub(r'href="\..*"', 'href=""', body)
                    f2.write(body)
