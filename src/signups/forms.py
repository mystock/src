from django import forms
from .models import SignUp

class SignUpForm(forms.ModelForm):
    class Meta:
        model = SignUp
        
class TickerForm(forms.Form):
    ticker_name = forms.CharField(label='Stock ticker', max_length=5)
    