(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@iota/iota.js-next'), require('@iota/util.js-next'), require('mqtt')) :
    typeof define === 'function' && define.amd ? define(['exports', '@iota/iota.js-next', '@iota/util.js-next', 'mqtt'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.IotaMqtt = {}, global.Iota, global.IotaUtil, global.mqtt));
})(this, (function (exports, iota_js, util_js, mqtt) { 'use strict';

    function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () { return e[k]; }
                    });
                }
            });
        }
        n["default"] = e;
        return Object.freeze(n);
    }

    var mqtt__namespace = /*#__PURE__*/_interopNamespace(mqtt);

    // Copyright 2020 IOTA Stiftung
    /**
     * MQTT Client implementation for pub/sub communication.
     */
    class MqttClient {
        /**
         * Create a new instace of MqttClient.
         * @param endpoints The endpoint or endpoints list to connect to.
         * @param keepAliveTimeoutSeconds Timeout to reconnect if no messages received.
         */
        constructor(endpoints, keepAliveTimeoutSeconds = 30) {
            this._endpoints = Array.isArray(endpoints) ? endpoints : [endpoints];
            this._endpointsIndex = 0;
            this._subscriptions = {};
            this._statusSubscriptions = {};
            this._lastMessageTime = -1;
            this._keepAliveTimeoutSeconds = keepAliveTimeoutSeconds;
        }
        /**
         * Subscribe to the latest milestone updates.
         * @param callback The callback which is called when new data arrives.
         * @returns A subscription Id which can be used to unsubscribe.
         */
        milestonesLatest(callback) {
            return this.internalSubscribe("milestone-info/latest", true, callback);
        }
        /**
         * Subscribe to the latest confirmed milestone updates.
         * @param callback The callback which is called when new data arrives.
         * @returns A subscription Id which can be used to unsubscribe.
         */
        milestonesConfirmed(callback) {
            return this.internalSubscribe("milestone-info/confirmed", true, callback);
        }
        /**
         * Subscribe to get all blocks in binary form.
         * @param callback The callback which is called when new data arrives.
         * @returns A subscription Id which can be used to unsubscribe.
         */
        blocksRaw(callback) {
            return this.internalSubscribe("blocks", false, callback);
        }
        /**
         * Subscribe to get all blocks in object form.
         * @param callback The callback which is called when new data arrives.
         * @returns A subscription Id which can be used to unsubscribe.
         */
        blocks(callback) {
            return this.internalSubscribe("blocks", false, (topic, raw) => {
                callback(topic, iota_js.deserializeBlock(new util_js.ReadStream(raw)));
            });
        }
        /**
         * Subscribe to get the metadata for all the blocks.
         * @param callback The callback which is called when new data arrives.
         * @returns A subscription Id which can be used to unsubscribe.
         */
        blocksReferenced(callback) {
            return this.internalSubscribe("block-metadata/referenced", true, callback);
        }
        /**
         * Subscribe to all transaction blocks in their raw form.
         * @param callback The callback which is called when new data arrives.
         * @returns A subscription Id which can be used to unsubscribe.
         */
        blocksTransactionRaw(callback) {
            return this.internalSubscribe("blocks/transaction", false, callback);
        }
        /**
         * Subscribe to all transaction blocks.
         * @param callback The callback which is called when new data arrives.
         * @returns A subscription Id which can be used to unsubscribe.
         */
        blocksTransaction(callback) {
            return this.internalSubscribe("blocks/transaction", false, (topic, raw) => {
                callback(topic, iota_js.deserializeBlock(new util_js.ReadStream(raw)));
            });
        }
        /**
         * Subscribe to transaction blocks with tagged data in their raw form.
         * @param tag The tag to monitor as bytes or in hex, undefined for all blocks.
         * @param callback The callback which is called when new data arrives.
         * @returns A subscription Id which can be used to unsubscribe.
         */
        blocksTransactionTaggedDataRaw(tag, callback) {
            let subTag = "";
            if (typeof tag === "string") {
                subTag = `/${tag}`;
            }
            else if (tag instanceof Uint8Array) {
                subTag = `/${util_js.Converter.bytesToHex(tag)}`;
            }
            return this.internalSubscribe(`blocks/transaction/tagged-data${subTag}`, false, callback);
        }
        /**
         * Subscribe to all transaction blocks with tagged data.
         * @param tag The tag to monitor as bytes or in hex, undefined for all blocks.
         * @param callback The callback which is called when new data arrives.
         * @returns A subscription Id which can be used to unsubscribe.
         */
        blocksTransactionTaggedData(tag, callback) {
            let subTag = "";
            if (typeof tag === "string") {
                subTag = `/${tag}`;
            }
            else if (tag instanceof Uint8Array) {
                subTag = `/${util_js.Converter.bytesToHex(tag)}`;
            }
            return this.internalSubscribe(`blocks/transaction/tagged-data${subTag}`, false, (topic, raw) => {
                callback(topic, iota_js.deserializeBlock(new util_js.ReadStream(raw)));
            });
        }
        /**
         * Subscribe to all milestone payloads in their raw form.
         * @param callback The callback which is called when new data arrives.
         * @returns A subscription Id which can be used to unsubscribe.
         */
        milestoneRaw(callback) {
            return this.internalSubscribe("milestones", false, callback);
        }
        /**
         * Subscribe to all milestone payloads.
         * @param callback The callback which is called when new data arrives.
         * @returns A subscription Id which can be used to unsubscribe.
         */
        milestone(callback) {
            return this.internalSubscribe("milestones", false, (topic, raw) => {
                callback(topic, iota_js.deserializeMilestonePayload(new util_js.ReadStream(raw)));
            });
        }
        /**
         * Subscribe to get all blocks for the specified tag in binary form.
         * @param tag The tag to monitor as bytes or in hex, undefined for all blocks.
         * @param callback The callback which is called when new data arrives.
         * @returns A subscription Id which can be used to unsubscribe.
         */
        blocksTaggedRaw(tag, callback) {
            let subTag = "";
            if (typeof tag === "string") {
                subTag = `/${tag}`;
            }
            else if (tag instanceof Uint8Array) {
                subTag = `/${util_js.Converter.bytesToHex(tag)}`;
            }
            return this.internalSubscribe(`blocks/tagged-data${subTag}`, false, callback);
        }
        /**
         * Subscribe to get all blocks for the specified tag in object form.
         * @param tag The tag to monitor as bytes or in hex, undefined for all blocks.
         * @param callback The callback which is called when new data arrives.
         * @returns A subscription Id which can be used to unsubscribe.
         */
        blocksTagged(tag, callback) {
            let subTag = "";
            if (typeof tag === "string") {
                subTag = `/${tag}`;
            }
            else if (tag instanceof Uint8Array) {
                subTag = `/${util_js.Converter.bytesToHex(tag)}`;
            }
            return this.internalSubscribe(`blocks/tagged-data${subTag}`, false, (topic, raw) => {
                callback(topic, iota_js.deserializeBlock(new util_js.ReadStream(raw)));
            });
        }
        /**
         * Subscribe to metadata updates for a specific block.
         * @param blockId The block to monitor.
         * @param callback The callback which is called when new data arrives.
         * @returns A subscription Id which can be used to unsubscribe.
         */
        blocksMetadata(blockId, callback) {
            return this.internalSubscribe(`block-metadata/${blockId}`, true, callback);
        }
        /**
         * Subscribe to block updates for a specific transactionId.
         * @param transactionId The block to monitor.
         * @param callback The callback which is called when new data arrives.
         * @returns A subscription Id which can be used to unsubscribe.
         */
        transactionIncludedBlockRaw(transactionId, callback) {
            return this.internalSubscribe(`transactions/${transactionId}/included-block`, false, callback);
        }
        /**
         * Subscribe to block updates for a specific transactionId.
         * @param transactionId The block to monitor.
         * @param callback The callback which is called when new data arrives.
         * @returns A subscription Id which can be used to unsubscribe.
         */
        transactionIncludedBlock(transactionId, callback) {
            return this.internalSubscribe(`transactions/${transactionId}/included-block`, false, (topic, raw) => {
                callback(topic, iota_js.deserializeBlock(new util_js.ReadStream(raw)));
            });
        }
        /**
         * Subscribe to updates for a specific output.
         * @param outputId The output to monitor.
         * @param callback The callback which is called when new data arrives.
         * @returns A subscription Id which can be used to unsubscribe.
         */
        output(outputId, callback) {
            return this.internalSubscribe(`outputs/${outputId}`, true, callback);
        }
        /**
         * Subscribe to updates for an nft output.
         * @param nftId The Nft output to monitor.
         * @param callback The callback which is called when new data arrives.
         * @returns A subscription Id which can be used to unsubscribe.
         */
        nft(nftId, callback) {
            return this.internalSubscribe(`outputs/nft/${nftId}`, true, callback);
        }
        /**
         * Subscribe to updates for an alias output.
         * @param aliasId The alias output to monitor.
         * @param callback The callback which is called when new data arrives.
         * @returns A subscription Id which can be used to unsubscribe.
         */
        alias(aliasId, callback) {
            return this.internalSubscribe(`outputs/alias/${aliasId}`, true, callback);
        }
        /**
         * Subscribe to updates for a foundry output.
         * @param foundryId The foundry output to monitor.
         * @param callback The callback which is called when new data arrives.
         * @returns A subscription Id which can be used to unsubscribe.
         */
        foundry(foundryId, callback) {
            return this.internalSubscribe(`outputs/foundry/${foundryId}`, true, callback);
        }
        /**
         * Subscribe to the output with specific unlock condition and address.
         * @param condition The condition to monitor.
         * @param addressBech32 The address to monitor.
         * @param callback The callback which is called when new data arrives.
         * @returns A subscription Id which can be used to unsubscribe.
         */
        outputByConditionAndAddress(condition, addressBech32, callback) {
            return this.internalSubscribe(`outputs/unlock/${condition}/${addressBech32}`, true, callback);
        }
        /**
         * Subscribe to the spent outputs with specific unlock condition and address.
         * @param condition The condition to monitor.
         * @param addressBech32 The address to monitor.
         * @param callback The callback which is called when new data arrives.
         * @returns A subscription Id which can be used to unsubscribe.
         */
        outputSpentByConditionAndAddress(condition, addressBech32, callback) {
            return this.internalSubscribe(`outputs/unlock/${condition}/${addressBech32}/spent`, true, callback);
        }
        /**
         * Subscribe to the receive all receipts.
         * @param callback The callback which is called when new data arrives.
         * @returns A subscription Id which can be used to unsubscribe.
         */
        receipts(callback) {
            return this.internalSubscribe("receipts", true, callback);
        }
        /**
         * Subscribe to another type of message as raw data.
         * @param customTopic The topic to subscribe to.
         * @param callback The callback which is called when new data arrives.
         * @returns A subscription Id which can be used to unsubscribe.
         */
        subscribeRaw(customTopic, callback) {
            return this.internalSubscribe(customTopic, false, callback);
        }
        /**
         * Subscribe to another type of message as json.
         * @param customTopic The topic to subscribe to.
         * @param callback The callback which is called when new data arrives.
         * @returns A subscription Id which can be used to unsubscribe.
         */
        subscribeJson(customTopic, callback) {
            return this.internalSubscribe(customTopic, true, callback);
        }
        /**
         * Remove a subscription.
         * @param subscriptionId The subscription to remove.
         */
        unsubscribe(subscriptionId) {
            this.triggerStatusCallbacks({
                type: "subscription-remove",
                message: subscriptionId,
                state: this.calculateState()
            });
            if (this._statusSubscriptions[subscriptionId]) {
                delete this._statusSubscriptions[subscriptionId];
            }
            else {
                const topics = Object.keys(this._subscriptions);
                for (let i = 0; i < topics.length; i++) {
                    const topic = topics[i];
                    for (let j = 0; j < this._subscriptions[topic].subscriptionCallbacks.length; j++) {
                        if (this._subscriptions[topic].subscriptionCallbacks[j].subscriptionId === subscriptionId) {
                            this._subscriptions[topic].subscriptionCallbacks.splice(j, 1);
                            if (this._subscriptions[topic].subscriptionCallbacks.length === 0) {
                                delete this._subscriptions[topic];
                                // This is the last subscriber to this topic
                                // so unsubscribe from the actual client.
                                this.mqttUnsubscribe(topic);
                            }
                            return;
                        }
                    }
                }
            }
        }
        /**
         * Subscribe to changes in the client state.
         * @param callback Callback called when the state has changed.
         * @returns A subscription Id which can be used to unsubscribe.
         */
        statusChanged(callback) {
            const subscriptionId = util_js.Converter.bytesToHex(util_js.RandomHelper.generate(32));
            this._statusSubscriptions[subscriptionId] = callback;
            return subscriptionId;
        }
        /**
         * Subscribe to another type of message.
         * @param customTopic The topic to subscribe to.
         * @param isJson Should we deserialize the data as JSON.
         * @param callback The callback which is called when new data arrives.
         * @returns A subscription Id which can be used to unsubscribe.
         * @internal
         */
        internalSubscribe(customTopic, isJson, callback) {
            let isNewTopic = false;
            if (!this._subscriptions[customTopic]) {
                this._subscriptions[customTopic] = {
                    isJson,
                    subscriptionCallbacks: []
                };
                isNewTopic = true;
            }
            const subscriptionId = util_js.Converter.bytesToHex(util_js.RandomHelper.generate(32));
            this._subscriptions[customTopic].subscriptionCallbacks.push({
                subscriptionId,
                callback
            });
            this.triggerStatusCallbacks({
                type: "subscription-add",
                message: subscriptionId,
                state: this.calculateState()
            });
            if (isNewTopic) {
                this.mqttSubscribe(customTopic);
            }
            return subscriptionId;
        }
        /**
         * Subscribe to a new topic on the client.
         * @param topic The topic to subscribe to.
         * @internal
         */
        mqttSubscribe(topic) {
            if (!this._client) {
                // There is no client so we need to connect,
                // the new topic is already in the subscriptions so
                // it will automatically get subscribed to.
                this.mqttConnect();
            }
            else {
                // There is already a client so just subscribe to the new topic.
                try {
                    this._client.subscribe(topic);
                }
                catch (err) {
                    this.triggerStatusCallbacks({
                        type: "error",
                        message: `Subscribe to topic ${topic} failed on ${this._endpoints[this._endpointsIndex]}`,
                        state: this.calculateState(),
                        error: err
                    });
                }
            }
        }
        /**
         * Unsubscribe from a topic on the client.
         * @param topic The topic to unsubscribe from.
         * @internal
         */
        mqttUnsubscribe(topic) {
            if (this._client) {
                try {
                    this._client.unsubscribe(topic);
                }
                catch (err) {
                    this.triggerStatusCallbacks({
                        type: "error",
                        message: `Unsubscribe from topic ${topic} failed on ${this._endpoints[this._endpointsIndex]}`,
                        state: this.calculateState(),
                        error: err
                    });
                }
            }
        }
        /**
         * Connect the client.
         * @internal
         */
        mqttConnect() {
            if (!this._client) {
                try {
                    this._client = mqtt__namespace.connect(this._endpoints[this._endpointsIndex], {
                        keepalive: 0,
                        reconnectPeriod: this._keepAliveTimeoutSeconds * 1000
                    });
                    this._client.on("connect", () => {
                        // On a successful connection we want to subscribe to
                        // all the subscription topics.
                        try {
                            if (this._client) {
                                this._client.subscribe(Object.keys(this._subscriptions));
                                this.startKeepAlive();
                                this.triggerStatusCallbacks({
                                    type: "connect",
                                    message: `Connection complete ${this._endpoints[this._endpointsIndex]}`,
                                    state: this.calculateState()
                                });
                            }
                        }
                        catch (err) {
                            this.triggerStatusCallbacks({
                                type: "error",
                                message: `Subscribe to topics failed on ${this._endpoints[this._endpointsIndex]}`,
                                state: this.calculateState(),
                                error: err
                            });
                        }
                    });
                    this._client.on("message", (topic, message) => {
                        this._lastMessageTime = Date.now();
                        this.triggerCallbacks(topic, message);
                    });
                    this._client.on("error", err => {
                        this.triggerStatusCallbacks({
                            type: "error",
                            message: `Error on ${this._endpoints[this._endpointsIndex]}`,
                            state: this.calculateState(),
                            error: err
                        });
                        this.nextClient();
                    });
                }
                catch (err) {
                    this.triggerStatusCallbacks({
                        type: "connect",
                        message: `Connection failed to ${this._endpoints[this._endpointsIndex]}`,
                        state: this.calculateState(),
                        error: err
                    });
                    this.nextClient();
                }
            }
        }
        /**
         * Disconnect the client.
         * @internal
         */
        mqttDisconnect() {
            this.stopKeepAlive();
            if (this._client) {
                const localClient = this._client;
                this._client = undefined;
                try {
                    localClient.unsubscribe(Object.keys(this._subscriptions));
                    localClient.end();
                }
                catch { }
                this.triggerStatusCallbacks({
                    type: "disconnect",
                    message: `Disconnect complete ${this._endpoints[this._endpointsIndex]}`,
                    state: this.calculateState()
                });
            }
        }
        /**
         * Trigger the callbacks for the specified topic.
         * @param topic The topic to call the callbacks for.
         * @param data The data to send to the callbacks.
         * @internal
         */
        triggerCallbacks(topic, data) {
            if (this._subscriptions[topic]) {
                let decodedData = data;
                if (this._subscriptions[topic].isJson) {
                    try {
                        decodedData = JSON.parse(data.toString());
                    }
                    catch (err) {
                        this.triggerStatusCallbacks({
                            type: "error",
                            message: `Error decoding JSON for topic ${topic}`,
                            state: this.calculateState(),
                            error: err
                        });
                    }
                }
                for (let i = 0; i < this._subscriptions[topic].subscriptionCallbacks.length; i++) {
                    try {
                        this._subscriptions[topic].subscriptionCallbacks[i].callback(topic, decodedData);
                    }
                    catch (err) {
                        this.triggerStatusCallbacks({
                            type: "error",
                            message: `Triggering callback failed for topic ${topic} on subscription ${this._subscriptions[topic].subscriptionCallbacks[i].subscriptionId}`,
                            state: this.calculateState(),
                            error: err
                        });
                    }
                }
            }
        }
        /**
         * Trigger the callbacks for the status.
         * @param status The status to send to the callbacks.
         * @internal
         */
        triggerStatusCallbacks(status) {
            const subscriptionIds = Object.keys(this._statusSubscriptions);
            for (let i = 0; i < subscriptionIds.length; i++) {
                this._statusSubscriptions[subscriptionIds[i]](status);
            }
        }
        /**
         * Start the keep alive timer.
         * @internal
         */
        startKeepAlive() {
            this.stopKeepAlive();
            this._lastMessageTime = Date.now();
            this._timerId = setInterval(() => this.keepAlive(), (this._keepAliveTimeoutSeconds / 2) * 1000);
        }
        /**
         * Stop the keep alive timer.
         * @internal
         */
        stopKeepAlive() {
            if (this._timerId !== undefined) {
                clearInterval(this._timerId);
                this._timerId = undefined;
            }
        }
        /**
         * Keep the connection alive.
         * @internal
         */
        keepAlive() {
            if (Date.now() - this._lastMessageTime > this._keepAliveTimeoutSeconds * 1000) {
                this.mqttDisconnect();
                this.nextClient();
                this.mqttConnect();
            }
        }
        /**
         * Calculate the state of the client.
         * @returns The client state.
         * @internal
         */
        calculateState() {
            let state = "disconnected";
            if (this._client) {
                if (this._client.connected) {
                    state = "connected";
                }
                else if (this._client.disconnecting) {
                    state = "disconnecting";
                }
                else if (this._client.reconnecting) {
                    state = "connecting";
                }
            }
            return state;
        }
        /**
         * If there has been a problem switch to the next client endpoint.
         */
        nextClient() {
            this._endpointsIndex++;
            if (this._endpointsIndex >= this._endpoints.length) {
                this._endpointsIndex = 0;
            }
        }
    }

    exports.MqttClient = MqttClient;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
