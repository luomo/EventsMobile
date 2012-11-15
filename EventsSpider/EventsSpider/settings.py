# Scrapy settings for EventsSpider project
#
# For simplicity, this file contains only the most important settings by
# default. All the other settings are documented here:
#
#     http://doc.scrapy.org/topics/settings.html
#

BOT_NAME = 'EventsSpider'
BOT_VERSION = '1.0'

SPIDER_MODULES = ['EventsSpider.spiders']
NEWSPIDER_MODULE = 'EventsSpider.spiders'
USER_AGENT = '%s/%s' % (BOT_NAME, BOT_VERSION)

#DEFAULT_REQUEST_HEADERS = {
#    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
#    'Accept-Language': 'pt',
#    'Cache-Control':'no-cache',
#    
#}

#DOWNLOADER_MIDDLEWARES = {
#    'scrapy.contrib.downloadermiddleware.httpproxy.HttpProxyMiddleware': 110,
#    'EventsSpider.middlewares.ProxyMiddleware': 100,
#}

COOKIES_DEBUG = True
DOWNLOADER_DEBUG = True

#HTTPCACHE_ENABLED = True
DOWNLOAD_DELAY = 1 # 100 ms of delay
#LOG_STDOUT = True


ITEM_PIPELINES = [
    'EventsSpider.pipelines.EventsspiderPipeline'
]