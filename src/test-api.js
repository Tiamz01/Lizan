// Simple test to verify Deezer API integration through proxy
async function testDeezerAPI() {
  try {
    console.log("Testing Deezer API through proxy...");
    
    // Test top charts endpoint
    const response = await fetch('/api/chart/0/tracks?limit=1');
    const data = await response.json();
    
    console.log('Deezer API Response:', data);
    
    if (data && data.data && data.data.length > 0) {
      console.log('✅ API is working correctly');
      console.log('First track:', {
        title: data.data[0].title,
        artist: data.data[0].artist.name,
        album: data.data[0].album.title
      });
    } else {
      console.log('❌ API response is empty or malformed');
    }
  } catch (error) {
    console.error('❌ API test failed:', error);
  }
}

// Run the test
testDeezerAPI();