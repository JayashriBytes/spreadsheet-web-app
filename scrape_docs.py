import requests
from bs4 import BeautifulSoup

# Function to scrape text from a URL
def fetch_documentation(url):
    try:
        response = requests.get(url, timeout=10)  # Fetch the webpage content
        response.raise_for_status()  # Raise an exception for HTTP errors
        soup = BeautifulSoup(response.text, 'html.parser')  # Parse the HTML content
        text = soup.get_text(separator="\n")  # Extract plain text
        return text
    except requests.exceptions.RequestException as e:
        return f"Error fetching data from {url}: {e}"

# URLs for the CDP documentation
docs_urls = {
    "Segment": "https://segment.com/docs/?ref=nav",
    "mParticle": "https://docs.mparticle.com/",
    "Lytics": "https://docs.lytics.com/",
    "Zeotap": "https://docs.zeotap.com/home/en-us/"
}

# Fetch and store documentation for each platform
documentation = {}
for name, url in docs_urls.items():
    print(f"Fetching documentation for {name}...")
    documentation[name] = fetch_documentation(url)
    print(f"Finished fetching {name} documentation!\n")

# Print the first 500 characters of each documentation as a sample
for platform, content in documentation.items():
    print(f"--- {platform} Documentation ---")
    print(content[:500])  # Print a snippet
    print("\n")
