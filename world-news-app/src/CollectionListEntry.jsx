const CollectionListEntry = ({ news }) => {
  return (
    <div>
      <a href={news.link}>
        <span>{news.title}</span>
      </a>
    </div>
  );
};

export default CollectionListEntry;