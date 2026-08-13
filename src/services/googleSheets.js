const SCRIPT_URL = import.meta.env.VITE_GOOGLE_SHEETS_URL || '';

// Automatically crawled Busan tourist spots & mock data
const MOCK_DATA = {
  Districts: [
    { id: '1', name: 'Haeundae-gu', image: 'https://images.unsplash.com/photo-1542838685-6495df025cd0?auto=format&fit=crop&w=800', description: 'Beaches and modern cityscapes' },
    { id: '2', name: 'Jung-gu & Saha-gu', image: 'https://images.unsplash.com/photo-1617469165786-8007eda3caa7?auto=format&fit=crop&w=800', description: 'Historic markets and culture' },
    { id: '3', name: 'Yeongdo-gu', image: 'https://images.unsplash.com/photo-1588665045668-3d1933ba9fcc?auto=format&fit=crop&w=800', description: 'Ocean views and art villages' },
    { id: '4', name: 'Gijang & Seo-gu', image: 'https://images.unsplash.com/photo-1563298723-dcfebaa392e3?auto=format&fit=crop&w=800', description: 'Cable cars and ocean temples' }
  ],
  Alleyways: [
    { id: '101', districtId: '1', name: 'Haeundae Beach', lat: 35.1587, lng: 129.1604, intro: 'Busan iconic beach, known for soft white sand and vibrant coastal views.' },
    { id: '102', districtId: '1', name: 'Haeundae Blueline Park', lat: 35.1536, lng: 129.1834, intro: 'Scenic oceanfront railway featuring Sky Capsules and beach trains.' },
    { id: '103', districtId: '1', name: 'Busan X the SKY', lat: 35.1578, lng: 129.1678, intro: 'Observation deck offering panoramic 360-degree views of Busan coastline.' },
    { id: '104', districtId: '1', name: 'Dalmaji-gil Art Alley', lat: 35.1587, lng: 129.1764, intro: 'Charming hill with cafes and art galleries overlooking the sea.' },
    { id: '201', districtId: '2', name: 'Gamcheon Culture Village', lat: 35.0970, lng: 129.0108, intro: 'Colorful hillside art community known as the Machu Picchu of Busan.' },
    { id: '202', districtId: '2', name: 'Jagalchi Fish Market', lat: 35.0973, lng: 129.0287, intro: 'Koreas largest traditional seafood market with fresh local delicacies.' },
    { id: '203', districtId: '2', name: 'Bosu-dong Book Street', lat: 35.1037, lng: 129.0279, intro: 'Nostalgic historic alley filled with vintage secondhand bookstores.' },
    { id: '204', districtId: '2', name: 'Gukje Market Alley', lat: 35.1011, lng: 129.0298, intro: 'Bustling international heritage market with endless local street food.' },
    { id: '301', districtId: '3', name: 'Taejongdae Resort Park', lat: 35.0514, lng: 129.0872, intro: 'Dramatic coastal cliffs and lighthouse views on Yeongdo Island.' },
    { id: '302', districtId: '3', name: 'Huinnyeoul Culture Village', lat: 35.0777, lng: 129.0438, intro: 'Santorini of Korea on a stunning oceanfront cliffside.' },
    { id: '401', districtId: '4', name: 'Haedong Yonggungsa Temple', lat: 35.1903, lng: 129.2217, intro: 'Rare coastal Buddhist temple built directly on majestic seaside rocks.' },
    { id: '402', districtId: '4', name: 'Songdo Beach & Cable Car', lat: 35.0754, lng: 129.0169, intro: 'Koreas first public beach featuring scenic marine cable cars.' }
  ],
  Stories: [
    { alleywayId: '101', content: 'Haeundae Beach is the undisputed heart of Busan summer energy. Stretching 1.5 kilometers, it offers clear blue waters, fine white sand, and vibrant festival vibes year-round.', images: ['https://images.unsplash.com/photo-1542838685-6495df025cd0?w=800&auto=format&fit=crop'] },
    { alleywayId: '102', content: 'Haeundae Blueline Park transforms the former Donghae Nambu Railway line into an eco-friendly coastal park. Ride colorful Sky Capsules 7 to 10 meters above the ground with sea views.', images: ['https://images.unsplash.com/photo-1563298723-dcfebaa392e3?w=800&auto=format&fit=crop'] },
    { alleywayId: '103', content: 'Located on the 98th to 100th floors of LCT Tower, Busan X the SKY is Koreas second highest observation deck, offering unmatched panoramic views of Haeundae Beach and Gwangan Bridge.', images: ['https://images.unsplash.com/photo-1588665045668-3d1933ba9fcc?w=800&auto=format&fit=crop'] },
    { alleywayId: '104', content: 'Dalmaji-gil is a beloved scenic road lined with pine and cherry blossom trees. It is famous for its cozy cafes, fine art galleries, and romantic moonlit ocean vistas.', images: ['https://images.unsplash.com/photo-1617469165786-8007eda3caa7?w=800&auto=format&fit=crop'] },
    { alleywayId: '201', content: 'Gamcheon Culture Village was built by Korean War refugees on steep mountain slopes. Today, its pastel-colored houses, alleyway murals, and art sculptures attract visitors worldwide.', images: ['https://images.unsplash.com/photo-1617469165786-8007eda3caa7?w=800&auto=format&fit=crop'] },
    { alleywayId: '202', content: 'Jagalchi Market is Koreas premier seafood hub. Run largely by resilient Jagalchi Ajumma (wives), you can pick live seafood on the 1st floor and enjoy it freshly prepared on the 2nd.', images: ['https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&auto=format&fit=crop'] },
    { alleywayId: '203', content: 'Bosu-dong Book Street originated during the Korean War when families sold precious books for food. Today, it remains a rare treasure trove of rare vintage books and peaceful cafes.', images: ['https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&auto=format&fit=crop'] },
    { alleywayId: '204', content: 'Gukje Market has been a bustling commercial heart since 1945. Explore narrow aisles packed with fashion, electronics, and legendary local street food like seed hotteok and tteokbokki.', images: ['https://images.unsplash.com/photo-1563298723-dcfebaa392e3?w=800&auto=format&fit=crop'] },
    { alleywayId: '301', content: 'Taejongdae is a magnificent natural park located at the southern tip of Yeongdo Island. Dense pine forests, steep seaside cliffs, and Yeongdo Lighthouse provide dramatic sea vistas.', images: ['https://images.unsplash.com/photo-1588665045668-3d1933ba9fcc?w=800&auto=format&fit=crop'] },
    { alleywayId: '302', content: 'Huinnyeoul Culture Village clings to the rocky cliffs of Yeongdo Island. Its winding coastal walkways, oceanview cafes, and blue-tinted houses offer a Greek island-like atmosphere.', images: ['https://images.unsplash.com/photo-1588665045668-3d1933ba9fcc?w=800&auto=format&fit=crop'] },
    { alleywayId: '401', content: 'Haedong Yonggungsa is one of the few oceanfront temples in Korea. Founded in 1376, it sits perched on rugged rocky shores where waves crash against ancient Buddhist pagodas.', images: ['https://images.unsplash.com/photo-1542838685-6495df025cd0?w=800&auto=format&fit=crop'] },
    { alleywayId: '402', content: 'Songdo Beach is Koreas oldest official public beach. Glide 86 meters above the ocean in the Songdo Marine Cable Car for breathtaking aerial views of the coastline and skywalk.', images: ['https://images.unsplash.com/photo-1563298723-dcfebaa392e3?w=800&auto=format&fit=crop'] }
  ]
};

const postData = async (sheet, action, payload) => {
    try {
        const url = `${SCRIPT_URL}?sheet=${sheet}&action=${action}`;
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: { 'Content-Type': 'text/plain;charset=utf-8' }
        });
        return await response.json();
    } catch (err) {
        console.error('Error posting data:', err);
        return null;
    }
};

const getData = async (sheet) => {
    if (!SCRIPT_URL) {
        console.log(`Using mock data for sheet: ${sheet}`);
        return MOCK_DATA[sheet] || [];
    }
    try {
        const response = await fetch(`${SCRIPT_URL}?sheet=${sheet}`);
        return await response.json();
    } catch (err) {
        console.error('Error getting data:', err);
        return MOCK_DATA[sheet] || [];
    }
};

export const getDistricts = async () => {
    return await getData('Districts');
};

export const getAlleyways = async (districtId) => {
    const all = await getData('Alleyways');
    if (!districtId) return all;
    return all.filter(a => a.districtId === districtId);
};

export const getStory = async (alleywayId) => {
    const stories = await getData('Stories');
    return stories.find(s => s.alleywayId === alleywayId) || { content: 'Story coming soon...', images: [] };
};

export const saveReview = async (review) => {
    const payload = { ...review, id: Date.now(), timestamp: new Date().toISOString() };
    if (!SCRIPT_URL) {
        console.log('Mock save review:', payload);
        return { success: true, payload };
    }
    const result = await postData('Reviews', 'append', payload);
    return result;
};

export const loginUser = async (userInfo) => {
    const payload = { ...userInfo, id: Date.now(), createdAt: new Date().toISOString() };
    if (!SCRIPT_URL) {
        console.log("Mock login:", payload);
        return payload;
    }
    await postData("Users", "append", payload);
    return payload;
};
