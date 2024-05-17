import {ConversationDisplayMode, HighlighterExtension} from '@nlux/core';
import {ReactElement} from 'react';
import {MessageDirection} from '../../../../../shared/src/ui/Message/props';
import {ResponseComponent} from '../../exports/messageOptions';

export type ChatItemProps<AiMsg> = {
    uid: string;
    direction: MessageDirection;
    displayMode: ConversationDisplayMode;
    dataTransferMode: 'fetch' | 'stream';
    status: 'streaming' | 'complete';
    fetchedContent?: AiMsg;
    fetchedServerResponse?: unknown;
    streamedContent?: AiMsg[];
    streamedServerResponse?: Array<unknown>;
    responseRenderer?: ResponseComponent<AiMsg>;
    name?: string;
    picture?: string | ReactElement;
    syntaxHighlighter?: HighlighterExtension;
    markdownLinkTarget?: 'blank' | 'self';
    showCodeBlockCopyButton?: boolean;
    skipStreamingAnimation?: boolean;
    streamingAnimationSpeed?: number;
};

export type ChatItemImperativeProps<AiMsg> = {
    streamChunk: (chunk: AiMsg) => void;
    completeStream: () => void;
};
