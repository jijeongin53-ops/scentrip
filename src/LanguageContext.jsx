import React, { createContext, useState, useContext } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en'); // Default to English

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

export const translations = {
  en: {
    discover: "Discover Local Secrets",
    discoverSub: "Dive deep into the picturesque alleyways of Busan. Authentic, curated stories for the true traveler.",
    chooseDistrict: "Choose Your District",
    loading: "Loading...",
    storyTitle: "The Local Tale",
    buyBtn: "Get ScenTrip Kit",
    reviewBtn: "Leave a Review",
    reviewTitle: "Leave a Review",
    submitBtn: "Submit Review",
    submitting: "Submitting..."
  },
  ko: {
    discover: "로컬의 비밀을 발견하세요",
    discoverSub: "부산의 그림 같은 골목길로 깊이 들어가 보세요. 진정한 여행자를 위한 진짜 이야기.",
    chooseDistrict: "지역구를 선택하세요",
    loading: "로딩 중...",
    storyTitle: "골목길 스토리",
    buyBtn: "ScenTrip 키트 구매하기",
    reviewBtn: "리뷰 남기기",
    reviewTitle: "리뷰 남기기",
    submitBtn: "리뷰 제출",
    submitting: "제출 중..."
  },
  ja: {
    discover: "地元の秘密を発見する",
    discoverSub: "釜山の絵のように美しい路地を深く探求しましょう。真の旅行者のための本物のストーリー。",
    chooseDistrict: "地区を選択してください",
    loading: "読み込み中...",
    storyTitle: "地元の物語",
    buyBtn: "ScenTripキットを入手",
    reviewBtn: "レビューを残す",
    reviewTitle: "レビューを残す",
    submitBtn: "レビューを送信",
    submitting: "送信中..."
  },
  zh: {
    discover: "发现当地的秘密",
    discoverSub: "深入釜山风景如画的小巷。为真正的旅行者提供真实的、精选的故事。",
    chooseDistrict: "选择您的地区",
    loading: "加载中...",
    storyTitle: "当地故事",
    buyBtn: "获取 ScenTrip 套件",
    reviewBtn: "留下评论",
    reviewTitle: "留下评论",
    submitBtn: "提交评论",
    submitting: "提交中..."
  }
};
