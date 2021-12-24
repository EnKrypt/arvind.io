import { DiscussionEmbed } from 'disqus-react';
import { useEffect, useState } from 'preact/hooks';

const Comments = ({ shortname, url, id, title }) => {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);

  if (hydrated) {
    return (
      <div className="comments">
        <DiscussionEmbed
          shortname={shortname}
          config={{
            url: url,
            identifier: id,
            title: title
          }}
        />
      </div>
    );
  } else {
    return (
      <div className="comments nojs">
        You&apos;ll need to enable Javascript to view and interact with comments
      </div>
    );
  }
};

export default Comments;
