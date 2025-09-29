import re
from urllib.parse import urlparse

SUSPICIOUS_KEYWORDS = ['login', 'secure', 'account', 'verify', 'password', 'signin']

# Helper function to check if a hostname is an IP address
def is_ip_address(hostname):
    if hostname is None:
        return False
    ip_pattern = re.compile(r'^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$')
    return bool(ip_pattern.match(hostname))

def extract_features(url):
    try:
        parsed = urlparse(url)
        hostname = parsed.hostname or ''
        path = parsed.path or ''
        # Hostname length
        hostname_length = len(hostname)
        # Path length
        path_length = len(path)
        # Subdomain count
        subdomain_count = hostname.count('.') if hostname else 0
        # Uses IP address
        uses_ip_address = 1 if is_ip_address(hostname) else 0
        # Special character count
        special_chars = ['-', '@', '?', '=', '.']
        special_char_count = sum(url.count(char) for char in special_chars)
        # Keyword count
        keyword_count = sum(url.lower().count(kw) for kw in SUSPICIOUS_KEYWORDS)
        return {
            'hostname_length': hostname_length,
            'path_length': path_length,
            'subdomain_count': subdomain_count,
            'uses_ip_address': uses_ip_address,
            'special_char_count': special_char_count,
            'keyword_count': keyword_count
        }
    except Exception:
        return {
            'hostname_length': 0,
            'path_length': 0,
            'subdomain_count': 0,
            'uses_ip_address': 0,
            'special_char_count': 0,
            'keyword_count': 0
        }
