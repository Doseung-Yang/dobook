'use client';

import { useState, useMemo, useCallback, Suspense, lazy } from 'react';
import { skillsHandbookConfig } from '@/data/skills';
import { QuestionAnswer } from '@/components/handbook/QuestionAnswer';
import { SearchBar } from '@/components/handbook/SearchBar';
import { CategoryFilter } from '@/components/handbook/CategoryFilter';
import { ModeToggle } from '@/components/handbook/ModeToggle';
import { ScrollToTop } from '@/components/ui/ScrollToTop';
import { filterItemsByQuery } from '@/helpers/search';
import type { ViewMode, CategoryType } from '@/types';

const GameMode = lazy(() => import('@/components/handbook/GameMode').then((mod) => ({ default: mod.GameMode })));

export default function Home() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | 'all'>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('study');
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const filteredItems = useMemo(() => {
    let items = Array.from(skillsHandbookConfig.items);

    if (selectedCategory !== 'all') {
      items = items.filter((item) => item.categoryType === selectedCategory);
    }

    if (searchQuery.trim().length > 0) {
      items = filterItemsByQuery(items, searchQuery);
    }

    return items;
  }, [searchQuery, selectedCategory]);

  const handleToggleItem = useCallback((itemId: string): void => {
    setExpandedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  }, []);

  const gameModeKey = filteredItems.map((item) => item.id).join(',');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-8">
      <div className="container mx-auto px-4 py-4 md:py-8 max-w-4xl">
        <header className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            {skillsHandbookConfig.title}
          </h1>
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
            {skillsHandbookConfig.description}
          </p>
        </header>

        <ModeToggle currentMode={viewMode} onModeChange={setViewMode} />

        {viewMode === 'game' ? (
          <Suspense fallback={<div className="text-center py-12 text-gray-500 dark:text-gray-400">게임 모드 로딩 중...</div>}>
            <GameMode
              key={gameModeKey}
              items={filteredItems}
              onBack={() => setViewMode('study')}
            />
          </Suspense>
        ) : (
          <>
            <div className="mb-4 md:mb-6">
              <SearchBar
                onSearch={setSearchQuery}
                placeholder="질문이나 키워드로 검색하세요..."
              />
            </div>

            <CategoryFilter
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />

            <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
              총 {filteredItems.length}개의 질문
            </div>

            <div className="space-y-3 md:space-y-4">
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <QuestionAnswer
                    key={item.id}
                    item={item}
                    isExpanded={expandedItems.has(item.id)}
                    onToggleItem={handleToggleItem}
                  />
                ))
              ) : (
                <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                  검색 결과가 없습니다.
                </div>
              )}
            </div>
          </>
        )}
      </div>
      <ScrollToTop />
    </div>
  );
}
