var jaipurPatch = {
    opponentHand: null,

    notif_cardsTaken: function (e) {
        msg = e.args;
        if (msg.player_id == gameui.player_id || (gameui.isSpectator && msg.player_id == this.gamedatas.spectator_alias)) {
            return;
        }
        if (msg.cardsFromHand.legnth > 0) {
            console.log("cards from hand", msg.cardsFromHand);
            for (var i in msg.cardsFromHand) {
                for (var j in this.opponentHand) {
                    if (this.opponentHand[j].type == msg.cardsFromHand[i].type) {
                        this.opponentHand[j].type = "back";
                        break;
                    }
                }
            }
            console.log("cards from markets", msg.cardsFromMarket);
            for (var i in msg.cardsFromMarket) {
                if (msg.cardsFromMarket[i].type == "camel") { // not in hand
                    continue;
                }
                for (var j in this.opponentHand) {
                    console.log("type(" + this.opponentHand[j].id + ")==" + msg.cardsFromMarket[i].type);
                    if (this.opponentHand[j].type == "back") {
                        this.opponentHand[j].type = msg.cardsFromMarket[i].type;
                        console.log("type(" + this.opponentHand[j].id + ")=" + msg.cardsFromMarket[i].type);
                        break;
                    }
                }
            }
        } else {
            this.opponentHand.concat(msg.cardsFromMarket);
        }

        this.reload_ui();
    },

    reload_ui: function () {
        console.log("opponentHand", this.opponentHand);

        var cardCount = gameui.opponentHand.items.length;
        for (var i = 0; i < cardCount; i++) {
            gameui.opponentHand.items[i].type = "back";
        }
        var i = 0;
        for (var id in this.opponentHand) {
            if (i > cardCount) {
                console.error("i > cardCount");
                return;
            }
            console.log(this.opponentHand);
            console.log(this.opponentHand[id]);
            gameui.opponentHand.items[i++].type = this.opponentHand[id].type;
        }
    },

    setupNotifications: function () {
        dojo.subscribe("newRound", this, "init");
        dojo.subscribe("cardsTaken", this, "notif_cardsTaken");
    },

    init: function () {
        dojo.require(["dojo/parser", "dojo/dom", "dojo/domReady!"], function (parser, dom) {
            var reload_ui = this.reload_ui;
            gameui.showBackInOpponentHand = function () {
                var _76 = gameui.opponentHand.getAllItems();
                var _77;
                for (var i in _76) {
                    var _78 = _76[i];
                    if (_78.type != "back") {
                        _77 = $("opponent_hand_item_" + _78.id);
                        gameui.opponentHand.removeFromStockById(_78.id);
                        gameui.opponentHand.addToStock("back", _77);
                    }
                }

                reload_ui();
            };

            this.opponentHand = gameui.opponentHand.getAllItems();
            for (var i in this.opponentHand) {
                this.opponentHand[i].type = "back";
            }
            console.log("opponentHand", this.opponentHand);

            this.setupNotifications();

            console.log("BGA: Jaipur initialized");
        });

        console.log("BGA: Jaipur loaded");
    },
};

window.wrappedJSObject.jaipurPatch = cloneInto(
    jaipurPatch,
    window,
    { cloneFunctions: true });

window.wrappedJSObject.jaipurPatch.init();
