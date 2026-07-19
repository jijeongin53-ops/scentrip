const SCRIPT_URL = import.meta.env.VITE_GOOGLE_SHEETS_URL || '';

// Mock Data for fallback when API is not connected
const MOCK_DATA = {
  Districts: [
    { id: '1', name: 'Haeundae-gu', image: 'https://images.unsplash.com/photo-1542838685-6495df025cd0?auto=format&fit=crop&w=800', description: 'Beaches and modern cityscapes' },
    { id: '2', name: 'Jung-gu', image: 'https://images.unsplash.com/photo-1617469165786-8007eda3caa7?auto=format&fit=crop&w=800', description: 'Historic markets and culture' },
    { id: '3', name: 'Yeongdo-gu', image: 'https://images.unsplash.com/photo-1588665045668-3d1933ba9fcc?auto=format&fit=crop&w=800', description: 'Ocean views and art villages' },
    { id: '4', name: 'Seo-gu', image: 'https://images.unsplash.com/photo-1563298723-dcfebaa392e3?auto=format&fit=crop&w=800', description: 'Cable cars and peaceful shores' }
  ],
  Alleyways: [
    { id: '101', districtId: '1', name: 'Haeundae Market Alley', lat: 35.1631, lng: 129.1636, intro: 'Taste the local seafood and street food.' },
    { id: '102', districtId: '1', name: 'Dalmaji-gil Art Alley', lat: 35.1587, lng: 129.1764, intro: 'Cafes and galleries overlooking the sea.' },
    { id: '201', districtId: '2', name: 'Bosu-dong Book Street', lat: 35.1037, lng: 129.0279, intro: 'A nostalgic alley filled with secondhand books.' },
    { id: '202', districtId: '2', name: 'Gukje Market Alley', lat: 35.1011, lng: 129.0298, intro: 'Bustling international market.' },
    { id: '301', districtId: '3', name: 'Huinnyeoul Culture Village', lat: 35.0777, lng: 129.0438, intro: 'Santorini of Korea on the coastal cliff.' },
    { id: '401', districtId: '4', name: 'Songdo Beach Alley', lat: 35.0754, lng: 129.0169, intro: 'Historic beach and modern cable car.' }
  ],
  Stories: [
    { alleywayId: '101', content: 'Haeundae Market has a long history starting from... It is famous for its vibrant energy and fresh seafood.', images: ['https://images.unsplash.com/photo-1563298723-dcfebaa392e3?w=800&auto=format&fit=crop'] },
    { alleywayId: '201', content: 'Bosu-dong Book Street was formed after the Korean War when refugees started selling their books...', images: ['https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&auto=format&fit=crop'] }
  ]
};

const postData = async (sheet, action, payload) => {
    try {
        const url = `${SCRIPT_URL}?sheet=${sheet}&action=${action}`;
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: { 'Content-Type': 'text/plain;charset=utf-8' } // text/plain to avoid CORS preflight in Apps Script
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
    // In a real scenario, this would append to the "Users" sheet
    await postData("Users", "append", payload);
    return payload;
};

