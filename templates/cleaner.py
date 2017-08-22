from lxml.html import parse, tostring
import os
import re

script_dir = os.path.dirname(os.path.realpath(__file__))

header = """
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<!-- saved from url=(0086)http://web.archive.org/web/20100615060031/http://pmarchive.com/guide_to_startups_part1 -->
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en"><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>%s</title>

    <meta name="description" content="">
    <meta name="keywords" content="pmarca, pmarchive, guide to startups">
    <meta name="robots" content="index, follow, noarchive">
    <meta name="googlebot" content="noarchive">
    <link href="../../css/reset.css" media="screen" rel="stylesheet" type="text/css">
    <link href="../../css/pmarchive.css" media="screen" rel="stylesheet" type="text/css">
  </head>
<body>
"""

footer = """
</body>
</html>
"""

dirs = ['additional startup guides', 'bonus awesomeness', 'bonus startup essentials', 'Guide to Startups']


for path in dirs:
    for (dirpath, dirname, filenames) in os.walk(os.path.join(script_dir, 'pages', path)):
        for name in filenames:
            with open(os.path.join(dirpath, name)) as f:
                with open(os.path.join(script_dir, 'cleaned', path, name), 'w') as f2:
                    tree = parse(f)
                    post_body = tree.xpath('//div[@id="post_container"]')[0]
                    title = tree.xpath('//div[@id="post" or @class="post"]//h2[1]//text()')
                    title = ' '.join([t.strip() for t in title])

                    f2.write(header % title)
                    body = tostring(post_body)
                    body = re.sub(r'href="http://web.archive.org/web/\d+/http://pmarchive.com(.*)"', r'href="\1"', body)
                    body = re.sub(r'href="http://web.archive.org/web/\d+/(.*)"', r'href="\1"', body)
                    body = re.sub(r'href="\..*"', 'href=""', body)
                    f2.write(body)
                    f2.write(footer)
