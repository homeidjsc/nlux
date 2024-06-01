import {ChatItemProps} from '../../../../../../shared/src/components/ChatItem/props';
import {HighlighterExtension} from '../../../exports/aiChat/highlighter/highlighter';
import {SanitizerExtension} from '../../../exports/aiChat/sanitizer/sanitizer';

export type CompChatItemEvents = 'markdown-stream-complete';

export type CompChatItemProps = {
    uid: string;
    domProps: ChatItemProps;
    syntaxHighlighter?: HighlighterExtension;
    htmlSanitizer?: SanitizerExtension;
    markdownLinkTarget?: 'blank' | 'self';
    showCodeBlockCopyButton?: boolean;
    skipStreamingAnimation?: boolean;
    streamingAnimationSpeed?: number;
};

export type CompChatItemElements = Readonly<{
    chatItemContainer: HTMLElement;
}>;

export type CompChatItemActions = Readonly<{
    focus: () => void;
    processStreamedChunk: (chunk: string) => void;
    commitStreamedChunks: () => void;
    updateMarkdownStreamRenderer: (newProps: Partial<CompChatItemProps>) => void;
    updateDomProps: (oldProps: ChatItemProps, newProps: ChatItemProps) => void;
}>;
