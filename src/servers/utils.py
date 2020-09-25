import random

greetings = [
    'Hello', 'Hey', 'Hi', 'How’s it going', 'How are you doing',
    'What’s up', 'What’s new', 'What’s going on',
    'How’s everything', 'How are things', 'How’s life',
    'How’s your day', 'How’s your day going','Good to see you', 
    'Nice to see you', 'Long time no see', 'It’s been a while',
    'Good morning', 'Good afternoon', 'Good evening', 'Goodmorrow',
    'It’s nice to meet you', 'Pleased to meet you', 'Ahoy',
    'How have you been', 'How do you do', 'Yo', 'Are you OK', 
    'You alright', 'Howdy', 'Sup', 'Whazzup', 'Hiya', 'What’s crackin’',
    'What’s the craic', 'Lovely to meet you', 'Lovely to see you',
]

def random_greeting(name):
    greeting = random.choice(greetings)
    return f'{greeting}, {name}!'