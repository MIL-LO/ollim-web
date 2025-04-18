import { useState } from 'react';
import { CollectionList } from './CollectionList';
import { SelectedCollection } from './SelectedCollection';
import { useToast } from '@/hooks/useToast';

const Collection = () => {
  const [selectedCollection, setSelectedCollection] = useState<string>('');
  return (
    <>
      {selectedCollection === '' ? (
        <CollectionList setSelectedCollection={setSelectedCollection} />
      ) : (
        <SelectedCollection
          selectedCollectionId={selectedCollection}
          onSelectCollection={setSelectedCollection}
        />
      )}
    </>
  );
};
export default Collection;
