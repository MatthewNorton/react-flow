import React, { memo, useContext } from 'react';

import { useStoreActions, useStoreState } from '../../store/hooks';
import BaseHandle from './BaseHandle';
import NodeIdContext from '../../contexts/NodeIdContext';

import { HandleProps, ElementId, Position, Connection } from '../../types';

const Handle = memo(
  ({
    type = 'source',
    position = Position.Top,
    onConnect = () => {},
    isValidConnection = () => true,
    ...rest
  }: HandleProps) => {
    const nodeId = useContext(NodeIdContext) as ElementId;
    const { setPosition, setSourceId } = useStoreActions((a) => ({
      setPosition: a.setConnectionPosition,
      setSourceId: a.setConnectionSourceId,
    }));
    const onConnectAction = useStoreState((s) => s.onConnect);
    const onConnectExtended = (params: Connection) => {
      onConnectAction(params);
      onConnect(params);
    };

    return (
      <BaseHandle
        nodeId={nodeId}
        setPosition={setPosition}
        setSourceId={setSourceId}
        onConnect={onConnectExtended}
        type={type}
        position={position}
        isValidConnection={isValidConnection}
        {...rest}
      />
    );
  }
);

Handle.displayName = 'Handle';

export default Handle;
