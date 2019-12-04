import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { map } from 'lodash';
import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';
import { FavoritesControl } from '@/components/FavoritesControl';
import { QueryTagsControl } from '@/components/tags-control/TagsControl';
import { EditInPlace } from '@/components/EditInPlace';
import { currentUser } from '@/services/auth';
import getTags from '@/services/getTags';

import './query-header.less';

function getQueryTags() {
  return getTags('api/queries/tags').then(tags => map(tags, t => t.name));
}

export default function QueryHeader({ query, canEdit }) {
  const canEditTags = useMemo(() => (currentUser.id === query.user.id || currentUser.hasPermission('admin')), [query]);
  return (
    <div className="query-header">
      <FavoritesControl item={query} />
      <div className="page-title">
        <h3 className="m-t-10 m-b-10">
          <EditInPlace value={query.name} isEditable={canEdit} editor="input" ignoreBlanks />
        </h3>
        <QueryTagsControl
          tags={query.tags}
          isDraft={query.is_draft}
          isArchived={query.is_archived}
          canEdit={canEditTags}
          getAvailableTags={getQueryTags}
        />
      </div>
      <div>
        <Button className="hidden-xs m-r-5"><i className="fa fa-paper-plane m-r-5" /> Publish</Button>
        <Button className="m-r-5"><i className="fa fa-edit m-r-5" /> Edit Source</Button>
        <Button className="icon-button hidden-xs">
          <Icon type="ellipsis" rotate={90} />
        </Button>
      </div>
    </div>
  );
}

QueryHeader.propTypes = {
  query: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  canEdit: PropTypes.bool,
};

QueryHeader.defaultProps = { canEdit: false };
