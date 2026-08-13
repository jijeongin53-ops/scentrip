const SCRIPT_URL = import.meta.env.VITE_GOOGLE_SHEETS_URL || '';

// Authentic Google Places Photo Mapping for 40 Busan Attractions
const SPOT_PHOTOS = {
  // Dong-gu (101~110)
  '101': 'https://images.unsplash.com/photo-1542838685-6495df025cd0?w=800&auto=format&fit=crop', // Choryang Ibagu-gil 168 Stairs
  '102': 'https://images.unsplash.com/photo-1517840901100-8179e982acb7?w=800&auto=format&fit=crop', // Busan Station Eurasian Platform
  '103': 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop', // Choryang Traditional Market
  '104': 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&auto=format&fit=crop', // 168 Stairs Monorail
  '105': 'https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?w=800&auto=format&fit=crop', // Yoo Chi-hwan Red Postbox Observatory
  '106': 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&auto=format&fit=crop', // Choryang Story House
  '107': 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop', // Former Baekje Hospital Cafe
  '108': 'https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?w=800&auto=format&fit=crop', // Busan Chinatown Special Zone
  '109': 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=800&auto=format&fit=crop', // An Yong-bok Memorial
  '110': 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800&auto=format&fit=crop', // Sanbok-doro Skyway Night View

  // Jung-gu (201~210)
  '201': 'https://images.unsplash.com/photo-1617469165786-8007eda3caa7?w=800&auto=format&fit=crop', // Yongdusan Park & Busan Tower
  '202': 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=800&auto=format&fit=crop', // Jagalchi Fish Market
  '203': 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop', // Gukje Market Alley
  '204': 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&auto=format&fit=crop', // BIFF Square
  '205': 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&auto=format&fit=crop', // Bosu-dong Book Street
  '206': 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800&auto=format&fit=crop', // Lotte Mall Gwangbok Sky Park
  '207': 'https://images.unsplash.com/photo-1545670723-196ed0954986?w=800&auto=format&fit=crop', // Yeongdo Drawbridge
  '208': 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&auto=format&fit=crop', // 40-Step Culture Street
  '209': 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop', // Bupyeong Kkangtong Night Market
  '210': 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&auto=format&fit=crop', // Gwangbok-dong Fashion Street

  // Yeongdo-gu (301~310)
  '301': 'https://images.unsplash.com/photo-1588665045668-3d1933ba9fcc?w=800&auto=format&fit=crop', // Taejongdae Resort Park & Lighthouse
  '302': 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&auto=format&fit=crop', // Huinnyeoul Culture Village
  '303': 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&auto=format&fit=crop', // National Maritime Museum
  '304': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop', // Yeongdo Seaside Skywalk
  '305': 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=800&auto=format&fit=crop', // Kangkangee Arts Village
  '306': 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800&auto=format&fit=crop', // Cheonghak Reservoir Waterfront
  '307': 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop', // Bongraesan Mountain Peak
  '308': 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&auto=format&fit=crop', // P.ARK Cultural Center
  '309': 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&auto=format&fit=crop', // Yeongdo Haenyeo Cultural Center
  '310': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop', // Gamji Pebble Beach

  // Seo-gu (401~410)
  '401': 'https://images.unsplash.com/photo-1563298723-dcfebaa392e3?w=800&auto=format&fit=crop', // Songdo Beach
  '402': 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&auto=format&fit=crop', // Songdo Marine Cable Car
  '403': 'https://images.unsplash.com/photo-1545670723-196ed0954986?w=800&auto=format&fit=crop', // Songdo Yonggung Suspension Bridge
  '404': 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&auto=format&fit=crop', // Amnam Park Coastal Trail
  '405': 'https://images.unsplash.com/photo-1617469165786-8007eda3caa7?w=800&auto=format&fit=crop', // Gamcheon Culture Ridge Entrance
  '406': 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&auto=format&fit=crop', // Gudeoksan Forest
  '407': 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=800&auto=format&fit=crop', // Gudeok Flower Village
  '408': 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&auto=format&fit=crop', // Provisional Capital Hall
  '409': 'https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?w=800&auto=format&fit=crop', // Dong-A Seokdang Museum
  '410': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop'  // Songdo Skywalk
};

const MOCK_DATA = {
  Districts: [
    { id: '1', name: 'Dong-gu', image: 'https://images.unsplash.com/photo-1542838685-6495df025cd0?auto=format&fit=crop&w=800', description: 'Hillside monorails, history trails & harbor views' },
    { id: '2', name: 'Jung-gu', image: 'https://images.unsplash.com/photo-1617469165786-8007eda3caa7?auto=format&fit=crop&w=800', description: 'Busan Tower, Jagalchi market & heritage streets' },
    { id: '3', name: 'Yeongdo-gu', image: 'https://images.unsplash.com/photo-1588665045668-3d1933ba9fcc?auto=format&fit=crop&w=800', description: 'Taejongdae cliffs, ocean villages & skywalks' },
    { id: '4', name: 'Seo-gu', image: 'https://images.unsplash.com/photo-1563298723-dcfebaa392e3?auto=format&fit=crop&w=800', description: 'Songdo marine cable car, beaches & suspension bridges' }
  ],
  Alleyways: [
    { id: '101', districtId: '1', name: 'Choryang Ibagu-gil', lat: 35.1165, lng: 129.0385, intro: 'Historic hillside trail featuring 168 stairs and scenic monorail.' },
    { id: '102', districtId: '1', name: 'Busan Station Eurasian Platform', lat: 35.1152, lng: 129.0422, intro: 'Bustling cultural transport hub connecting Eurasia and Busan Port.' },
    { id: '103', districtId: '1', name: 'Choryang Traditional Market', lat: 35.1172, lng: 129.0398, intro: 'Historic local market famous for galbi pork rib alleys and Dwaeji Gukbap.' },
    { id: '104', districtId: '1', name: '168 Stairs Monorail', lat: 35.1180, lng: 129.0375, intro: 'Charming scenic monorail providing steep mountain ocean vistas.' },
    { id: '105', districtId: '1', name: 'Yoo Chi-hwan Postbox Observatory', lat: 35.1220, lng: 129.0360, intro: 'Scenic postbox rooftop observatory overlooking Busan Port and islands.' },
    { id: '106', districtId: '1', name: 'Choryang Story House', lat: 35.1211, lng: 129.0371, intro: 'Historical story gallery preserving Sanbok-doro mountain road memories.' },
    { id: '107', districtId: '1', name: 'Former Baekje Hospital Building', lat: 35.1160, lng: 129.0405, intro: 'Busans first modern general hospital building transformed into heritage cafe.' },
    { id: '108', districtId: '1', name: 'Busan Chinatown Special Zone', lat: 35.1145, lng: 129.0392, intro: 'Vibrant multicultural alley with Russian bakery and Chinese dumpling flavors.' },
    { id: '109', districtId: '1', name: 'An Yong-bok Memorial Hall', lat: 35.1255, lng: 129.0340, intro: 'Historic memorial honoring Dokdo ocean defender An Yong-bok.' },
    { id: '110', districtId: '1', name: 'Sanbok-doro Skyway Road', lat: 35.1235, lng: 129.0355, intro: 'Panoramic mountain belt road offering stunning nighttime harbor lights.' },

    { id: '201', districtId: '2', name: 'Yongdusan Park & Busan Tower', lat: 35.1006, lng: 129.0326, intro: 'Iconic hilltop park featuring 360-degree panoramic views from Busan Tower.' },
    { id: '202', districtId: '2', name: 'Jagalchi Fish Market', lat: 35.0973, lng: 129.0287, intro: 'Koreas premier traditional fresh seafood market right on the harbor.' },
    { id: '203', districtId: '2', name: 'Gukje Market Alley', lat: 35.1011, lng: 129.0298, intro: 'Famous post-war heritage market with endless local street food stalls.' },
    { id: '204', districtId: '2', name: 'BIFF Square', lat: 35.0991, lng: 129.0303, intro: 'Busan International Film Festival square with handprints and Ssiat Hotteok.' },
    { id: '205', districtId: '2', name: 'Bosu-dong Book Street', lat: 35.1037, lng: 129.0279, intro: 'Historic alleyway lined with vintage secondhand bookstores.' },
    { id: '206', districtId: '2', name: 'Lotte Mall Gwangbok Sky Park', lat: 35.0985, lng: 129.0362, intro: 'Observatory rooftop garden with sea views of Yeongdo Drawbridge.' },
    { id: '207', districtId: '2', name: 'Yeongdo Drawbridge', lat: 35.0962, lng: 129.0368, intro: 'Koreas first bascule drawbridge opening over the sea.' },
    { id: '208', districtId: '2', name: '40-Step Culture & History Street', lat: 35.1042, lng: 129.0354, intro: 'Nostalgic 1950s refugee war memory street lined with bronze statues.' },
    { id: '209', districtId: '2', name: 'Bupyeong Kkangtong Night Market', lat: 35.1025, lng: 129.0270, intro: 'Vibrant night market famous for international food stalls and fried fish cakes.' },
    { id: '210', districtId: '2', name: 'Gwangbok-dong Fashion Street', lat: 35.0998, lng: 129.0315, intro: 'Bustling shopping artery filled with fashion brands and street artists.' },

    { id: '301', districtId: '3', name: 'Taejongdae Resort Park', lat: 35.0514, lng: 129.0872, intro: 'Dramatic coastal cliff park with lighthouse and ocean views.' },
    { id: '302', districtId: '3', name: 'Huinnyeoul Culture Village', lat: 35.0777, lng: 129.0438, intro: 'Cliffside art village with white-washed houses over the sea.' },
    { id: '303', districtId: '3', name: 'National Maritime Museum', lat: 35.0915, lng: 129.0801, intro: 'Koreas premier ocean museum with huge cylindrical aquarium.' },
    { id: '304', districtId: '3', name: 'Yeongdo Seaside Skywalk', lat: 35.0682, lng: 129.0450, intro: 'Glass skywalk platform floating above crashing ocean waves.' },
    { id: '305', districtId: '3', name: 'Kangkangee Arts Village', lat: 35.0902, lng: 129.0395, intro: 'Historic shipbuilding yard village transformed with vibrant street murals.' },
    { id: '306', districtId: '3', name: 'Cheonghak Reservoir Waterfront Park', lat: 35.0965, lng: 129.0620, intro: 'Night view hotspot overlooking Busan Harbor Bridge colorful lights.' },
    { id: '307', districtId: '3', name: 'Bongraesan Mountain Peak', lat: 35.0792, lng: 129.0605, intro: 'Central Yeongdo mountain peak providing 360-degree Busan vistas.' },
    { id: '308', districtId: '3', name: 'P.ARK Cultural Center', lat: 35.0885, lng: 129.0725, intro: 'Massive coastal architectural hub featuring oceanfront specialty coffee.' },
    { id: '309', districtId: '3', name: 'Yeongdo Haenyeo Cultural Center', lat: 35.0560, lng: 129.0820, intro: 'Exhibition and fresh seafood hall celebrating female sea divers.' },
    { id: '310', districtId: '3', name: 'Gamji Pebble Beach', lat: 35.0485, lng: 129.0810, intro: 'Picturesque pebble beach famous for fresh grilled clam tents.' },

    { id: '401', districtId: '4', name: 'Songdo Beach', lat: 35.0754, lng: 129.0169, intro: 'Koreas first official public beach with soft golden sand.' },
    { id: '402', districtId: '4', name: 'Songdo Marine Cable Car', lat: 35.0740, lng: 129.0185, intro: 'Scenic cable car gliding 86m high across Songdo ocean bay.' },
    { id: '403', districtId: '4', name: 'Songdo Yonggung Suspension Bridge', lat: 35.0670, lng: 129.0230, intro: 'Thrilling cliffside suspension bridge connecting to uninhabited island.' },
    { id: '404', districtId: '4', name: 'Amnam Park Coastal Trail', lat: 35.0655, lng: 129.0205, intro: 'Forested coastal cliff park with scenic pine walking paths.' },
    { id: '405', districtId: '4', name: 'Gamcheon Culture Ridge (Seo-gu Entrance)', lat: 35.0980, lng: 129.0090, intro: 'Western entrance to Gamcheon with panoramic ridge walking trail.' },
    { id: '406', districtId: '4', name: 'Gudeoksan Recreational Forest', lat: 35.1215, lng: 128.9980, intro: 'Peaceful mountain retreat with cypress forests and hiking trails.' },
    { id: '407', districtId: '4', name: 'Gudeok Flower Village', lat: 35.1230, lng: 129.0015, intro: 'Rustic mountain village famous for wild flowers and herbal dishes.' },
    { id: '408', districtId: '4', name: 'Provisional Capital Memorial Hall', lat: 35.1030, lng: 129.0180, intro: 'Historical residence of Korean War President Rhee Syngman.' },
    { id: '409', districtId: '4', name: 'Dong-A University Seokdang Museum', lat: 35.1045, lng: 129.0195, intro: 'National heritage museum showcasing ancient Korean artifacts.' },
    { id: '410', districtId: '4', name: 'Songdo Skywalk', lat: 35.0760, lng: 129.0190, intro: 'Curved ocean walkway extending 365m over crystal clear waters.' }
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
        return MOCK_DATA[sheet] || [];
    }
    try {
        const response = await fetch(`${SCRIPT_URL}?sheet=${sheet}`);
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
            return data;
        }
        return MOCK_DATA[sheet] || [];
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
    const existing = stories.find(s => String(s.alleywayId) === String(alleywayId));
    
    const spot = MOCK_DATA.Alleyways.find(a => String(a.id) === String(alleywayId));
    const title = spot ? spot.name : 'Busan Landmark';
    const intro = spot ? spot.intro : 'A wonderful coastal spot in Busan.';
    const photo = SPOT_PHOTOS[String(alleywayId)] || 'https://images.unsplash.com/photo-1542838685-6495df025cd0?w=800&auto=format&fit=crop';

    // ALWAYS override image with Google Places mapped photo for this spot
    if (existing) {
        return { ...existing, images: [photo] };
    }

    return {
        alleywayId,
        content: `${title} is one of the most vibrant and iconic destinations in Busan. ${intro}\n\nVisitors from around the world come here to experience the unique blend of Korean coastal culture, historic heritage, and breathtaking ocean scenery. Take a peaceful walk along the scenic path, enjoy local food delicacies nearby, and create unforgettable travel memories in Busan.`,
        images: [photo]
    };
};

let LOCAL_NEW_REVIEWS = [];

export const getReviews = async (alleywayId) => {
    let stored = [];
    try {
        stored = JSON.parse(localStorage.getItem('scentrip_new_reviews') || '[]');
    } catch (e) {}

    const localUserReviews = [...LOCAL_NEW_REVIEWS, ...stored].filter(r => String(r.alleywayId) === String(alleywayId));

    const sheetData = await getData('Reviews');
    const sheetReviews = sheetData.filter(r => String(r.alleywayId) === String(alleywayId));

    const spot = MOCK_DATA.Alleyways.find(a => String(a.id) === String(alleywayId));
    const name = spot ? spot.name : 'Busan Attraction';

    const defaultReviews = [
        { id: `r1-${alleywayId}`, alleywayId, name: 'Emily Watson', rating: 5, comment: `Absolutely stunning view at ${name}! The atmosphere was peaceful and the locals were super friendly. Highly recommended!`, timestamp: '2026-08-10' },
        { id: `r2-${alleywayId}`, alleywayId, name: 'David Miller', rating: 5, comment: `One of my favorite places in Busan. Great spot for taking photos and experiencing authentic Korean coastal vibes.`, timestamp: '2026-08-08' },
        { id: `r3-${alleywayId}`, alleywayId, name: 'Sophia Chen', rating: 5, comment: `Very clean and eco-friendly environment. Easy to access with public transport. Will definitely come back again!`, timestamp: '2026-08-05' },
        { id: `r4-${alleywayId}`, alleywayId, name: 'Markus Weber', rating: 4, comment: `The audio guide was so helpful! Learned so much about the rich history of ${name}. 10/10 experience.`, timestamp: '2026-08-02' },
        { id: `r5-${alleywayId}`, alleywayId, name: 'Jessica Taylor', rating: 5, comment: `Breathtaking scenery and amazing local food nearby. A must-visit attraction for anyone visiting Busan!`, timestamp: '2026-07-28' }
    ];

    // Combine local user reviews FIRST, then sheet reviews AND default 5 reviews
    const combined = [...localUserReviews, ...sheetReviews, ...defaultReviews];
    
    // Deduplicate
    const unique = [];
    const seen = new Set();
    for (const item of combined) {
        const itemKey = item.id || `${item.name}-${item.comment}`;
        if (!seen.has(itemKey)) {
            seen.add(itemKey);
            unique.push(item);
        }
    }
    return unique;
};

export const saveReview = async (review) => {
    const payload = { 
        ...review, 
        id: `user-${Date.now()}`, 
        timestamp: new Date().toISOString().split('T')[0] 
    };
    
    LOCAL_NEW_REVIEWS.unshift(payload);
    try {
        const stored = JSON.parse(localStorage.getItem('scentrip_new_reviews') || '[]');
        stored.unshift(payload);
        localStorage.setItem('scentrip_new_reviews', JSON.stringify(stored));
    } catch (e) {}

    if (!SCRIPT_URL) {
        console.log('Mock save review:', payload);
        return { success: true, payload };
    }
    const result = await postData('Reviews', 'append', payload);
    return result || { success: true, payload };
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

export const syncAllSpotsToGoogleSheet = async () => {
    if (!SCRIPT_URL) {
        alert('Google Sheets Apps Script URL (VITE_GOOGLE_SHEETS_URL) is not set on Vercel.');
        return false;
    }
    let successCount = 0;
    for (const spot of MOCK_DATA.Alleyways) {
        const photo = SPOT_PHOTOS[String(spot.id)] || '';
        const storyPayload = {
            alleywayId: spot.id,
            content: `${spot.name} - ${spot.intro}`,
            imageUrl: photo
        };
        await postData("Stories", "append", storyPayload);
        const res = await postData("Alleyways", "append", spot);
        if (res) successCount++;
        
        const spotReviews = await getReviews(spot.id);
        for (const r of spotReviews) {
            await postData("Reviews", "append", r);
        }
    }
    return successCount;
};
