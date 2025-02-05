import {ChatAdapter} from '@shared/types/adapters/chat/chatAdapter';
import {ChatAdapterBuilder} from '@shared/types/adapters/chat/chatAdapterBuilder';
import {StandardChatAdapter} from '@shared/types/adapters/chat/standardChatAdapter';
import {ChatItem} from '@shared/types/conversation';
import {ComposerOptions} from '../../aiChat/options/composerOptions';
import {ConversationOptions} from '../../aiChat/options/conversationOptions';
import {DisplayOptions} from '../../aiChat/options/displayOptions';
import {MessageOptions} from '../../aiChat/options/messageOptions';
import {PersonaOptions} from '../../aiChat/options/personaOptions';
import {EventCallback, EventName, EventsMap} from '../event';
import {UpdatableAiChatProps} from './props';

/**
 * The status of the AiChat component.
 * - `idle`: The component has not been mounted yet.
 * - `mounted`: The component is currently mounted and active. It can be visible or hidden.
 * - `unmounted`: The component has been unmounted and destroyed and cannot be used anymore.
 */
export type AiChatStatus = 'idle' | 'mounted' | 'unmounted';

/**
 * The main interface representing AiChat component.
 * It provides methods to instantiate, mount, and unmount the component, and listen to its events.
 */
export interface IAiChat<AiMsg> {
    /**
     * Hides the chat component.
     * This does not unmount the component. It will only hide the chat component from the view.
     */
    hide(): void;

    /**
     * Mounts the chat component to the given root element.
     *
     * @param {HTMLElement} rootElement
     */
    mount(rootElement: HTMLElement): void;
    /**
     * Adds an event listener to the chat component.
     * The callback will be called when the event is emitted, with the expected event details.
     *
     * @param {EventName} event The name of the event to listen to.
     * @param {EventsMap[EventName]} callback The callback to be called, that should match the event type.
     * @returns {IAiChat}
     */
    on(event: EventName, callback: EventsMap<AiMsg>[EventName]): IAiChat<AiMsg>;
    /**
     * Removes all event listeners from the chat component for a specific event.
     *
     * @param {EventName} event
     */
    removeAllEventListeners(event: EventName): void;
    /**
     * Removes the given event listener for the specified event.
     *
     * @param {EventName} event The name of the event to remove the listener from.
     * @param {EventsMap[EventName]} callback The callback to be removed.
     */
    removeEventListener(event: EventName, callback: EventCallback<AiMsg>): void;
    /**
     * Shows the chat component.
     * This method expects the chat component to be mounted.
     */
    show(): void;
    /**
     * Returns true if the chat component is mounted.
     */
    get status(): AiChatStatus;
    /**
     * Unmounts the chat component.
     * This will remove the chat component from the view and clean up its resources.
     * After unmounting, the chat component cannot be mounted again as all its resources, options, event listeners, and
     * adapters will be removed. You should create a new chat component if you want to use it again.
     */
    unmount(): void;

    /**
     * Updates the properties of the chat component. This method expects the chat component to be mounted.
     * The properties will be updated and the relevant parts of the chat component will be re-rendered.
     *
     * @param {UpdatableAiChatProps} props The properties to be updated.
     */
    updateProps(props: UpdatableAiChatProps<AiMsg>): void;

    /**
     * Enabled providing an adapter to the chat component.
     * The adapter will be used to send and receive messages from the chat backend.
     * This method should be called before mounting the chat component, and it should be called only once.
     *
     * @param {adapter: ChatAdapter | StandardChatAdapter | ChatAdapterBuilder} adapter The builder for the chat
     *     adapter.
     */
    withAdapter(adapter: ChatAdapter<AiMsg> | StandardChatAdapter<AiMsg> | ChatAdapterBuilder<AiMsg>): IAiChat<AiMsg>;

    /**
     * Enables providing a class name to the chat component.
     * The class name will be added to the root element of the chat component.
     * This method should be called before mounting the chat component, and it should be called only once.
     *
     * @param {string} className The class name to be added to the chat component.
     */
    withClassName(className: string): IAiChat<AiMsg>;
    /**
     * Enables providing composer options to the chat component.
     * This method can be called before mounting the chat component, and it can be called only once.
     *
     * @param {ComposerOptions} composerOptions The composer options to be used.
     */
    withComposerOptions(composerOptions: ComposerOptions): IAiChat<AiMsg>;
    /**
     * The conversation options will be used to configure the conversation behavior and display.
     * This method can be called before mounting the chat component, and it can be called only once.
     *
     * @param {ConversationOptions} conversationOptions The conversation options to be used.
     */
    withConversationOptions(conversationOptions: ConversationOptions): IAiChat<AiMsg>;
    /**
     * Enables providing display options to the chat component. The display options will be used to configure the
     * layout of the chat component. When no display options are provided, the default display options will be used.
     * This method can be called before mounting the chat component, and it can be called only once.
     *
     * @param {DisplayOptions} displayOptions The display options to be used.
     */
    withDisplayOptions(displayOptions: DisplayOptions): IAiChat<AiMsg>;
    /**
     * Enables providing an initial conversation to the chat component.
     * The initial conversation will be used to populate the chat component with a conversation history.
     * This method can be called before mounting the chat component, and it can be called only once.
     *
     * @param {ChatItem[]} initialConversation
     * @returns {IAiChat}
     */
    withInitialConversation(initialConversation: ChatItem<AiMsg>[]): IAiChat<AiMsg>;
    /**
     * Enables providing message options to the chat component.
     * The message options will be used to configure the behavior and the
     * display of the messages inside the chat component.
     *
     * @param {MessageOptions<AiMsg>} messageOptions
     * @returns {IAiChat<AiMsg>}
     */
    withMessageOptions(messageOptions: MessageOptions<AiMsg>): IAiChat<AiMsg>;
    /**
     * Enables providing persona options to the chat component. The persona options will be used to configure
     * the assistant and user personas in the chat component.
     * This method can be called before mounting the chat component, and it can be called only once.
     *
     * @param {PersonaOptions} personaOptions The persona options to be used.
     */
    withPersonaOptions(personaOptions: PersonaOptions): IAiChat<AiMsg>;
}
