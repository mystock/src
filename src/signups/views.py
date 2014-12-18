from django.shortcuts import render, render_to_response, RequestContext, HttpResponseRedirect
from django.http import HttpResponse
from django.contrib import messages
import csv
import json
import ystockquote
import datetime
# Create your views here.

from .forms import SignUpForm, TickerForm

ticker = ""
GLOBAL_Entry = None

def home(request):
    
    form = SignUpForm(request.POST or None)
    
    if form.is_valid():
        save_it = form.save(commit=False)
        save_it.save()
        messages.success(request, 'We will be in touch!')
        return HttpResponseRedirect('/thank-you/')
    
    return render_to_response("signup.html",
                              locals(),
                              context_instance=RequestContext(request))



def thankyou(request):
    
    return render_to_response("thankyou.html",
                              locals(),
                              context_instance=RequestContext(request))


def aboutus(request):
    
    return render_to_response("aboutus.html",
                              locals(),
                              context_instance=RequestContext(request))

def dashboard(request):
    Tickerform = TickerForm(request.POST)
    # if this is a POST request we need to process the form data
    if request.method == 'POST':
        # check whether it's valid:
        if Tickerform.is_valid():
            # process the data in form.cleaned_data as required
            # ...
            # redirect to a new URL:
            global ticker, GLOBAL_Entry
            ticker = Tickerform.cleaned_data['ticker_name']
            var = ystockquote.get_price(ticker)
            messages.success(request, 'Current Price of '+ Tickerform.cleaned_data['ticker_name']+' is ' + var);
            
            
    # if a GET (or any other method) we'll create a blank form
    
        
    return render_to_response("dashboard.html",
                              locals(),
                              context_instance=RequestContext(request))

def data(request):
    
    now = datetime.datetime.now()
    global ticker, GLOBAL_Entry
    all_prices = ystockquote.get_historical_prices(ticker, '1970-01-01', now.strftime("%Y-%m-%d"))
            
    #file = open("CSVprices.csv", "w")
            
    dateAndPrice = []
            
    for each in all_prices:
        
        dateAndPrice.append({'date': each, 'val': float(all_prices[each]['Close'])})
    
    dateAndPrice.sort(key=lambda x: datetime.datetime.strptime(x['date'], '%Y-%m-%d'))
    return HttpResponse(json.dumps(dateAndPrice), content_type="application/json")

#def get_name(request):
#
#    # create a form instance and populate it with data from the request:
#    Tickerform = TickerForm(request.POST or None)
#    # if this is a POST request we need to process the form data
#    if request.method == 'POST':
#        # check whether it's valid:
#        if Tickerform.is_valid():
#            # process the data in form.cleaned_data as required
#            # ...
#            # redirect to a new URL:
#            return HttpResponseRedirect('/thank-you/')
#
#    # if a GET (or any other method) we'll create a blank form
#    else:
#        
#        form = TickerForm()
#
#    return render(request, 'dashboard.html', {'Tickerform': Tickerform})



