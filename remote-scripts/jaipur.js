define(["dojo", "dojo/_base/declare", "ebg/core/gamegui", "ebg/counter", "ebg/stock"], function (dojo, _2) {
    return _2("bgagame.jaipur", ebg.core.gamegui, {
        constructor: function () {
            console.log("jaipur constructor");
            this.gameConstants = null;
            this.cardsSpriteImg = null;
            this.collection = {};
            this.bonus_collection = {};
        },
        setup: function (_3) {
            console.log("Starting game setup");
            var _4 = dojo.coords("topbar");
            if (_4.w <= 1300) {
                dojo.addClass("ebd-body", "jaipur_1024");
                this.gameConstants = _3.constants["1024"];
                this.cardsSpriteImg = "img/cards_1024.png";
                this.dontPreloadImage("board.png");
                this.dontPreloadImage("cards.png");
                this.dontPreloadImage("tokens.png");
                this.dontPreloadImage("tokens_under.png");
                this.dontPreloadImage("discard_under.png");
                this.dontPreloadImage("board_1366.png");
                this.dontPreloadImage("cards_1366.png");
                this.dontPreloadImage("tokens_1366.png");
                this.dontPreloadImage("tokens_under_1366.png");
                this.dontPreloadImage("discard_under_1366.png");
            }
            if (_4.w > 1300 && _4.w <= 1500) {
                dojo.addClass("ebd-body", "jaipur_1366");
                this.gameConstants = _3.constants["1366"];
                this.cardsSpriteImg = "img/cards_1366.png";
                this.dontPreloadImage("board.png");
                this.dontPreloadImage("cards.png");
                this.dontPreloadImage("tokens.png");
                this.dontPreloadImage("tokens_under.png");
                this.dontPreloadImage("discard_under.png");
                this.dontPreloadImage("board_1024.png");
                this.dontPreloadImage("cards_1024.png");
                this.dontPreloadImage("tokens_1024.png");
                this.dontPreloadImage("tokens_under_1024.png");
                this.dontPreloadImage("discard_under_1024.png");
            }
            if (_4.w > 1500) {
                dojo.addClass("ebd-body", "jaipur_1600");
                this.gameConstants = _3.constants["1600"];
                this.cardsSpriteImg = "img/cards.png";
                this.dontPreloadImage("board_1024.png");
                this.dontPreloadImage("cards_1024.png");
                this.dontPreloadImage("tokens_1024.png");
                this.dontPreloadImage("tokens_under_1024.png");
                this.dontPreloadImage("discard_under_1024.png");
                this.dontPreloadImage("board_1366.png");
                this.dontPreloadImage("cards_1366.png");
                this.dontPreloadImage("tokens_1366.png");
                this.dontPreloadImage("tokens_under_1366.png");
                this.dontPreloadImage("discard_under_1366.png");
            }
            for (var _5 in _3.players) {
                var _6 = _3.players[_5];
                var _7 = $("player_board_" + _5);
                dojo.place(this.format_block("jstpl_player_board", _6), _7);
                this.collection[_5] = new ebg.stock();
                this.collection[_5].create(this, $("player_collection_" + _5), 30, 30);
                this.collection[_5].image_items_per_row = 1;
                this.collection[_5].setSelectionMode(0);
                this.collection[_5].addItemType(1, 1, g_gamethemeurl + "img/icons.png", 0);
                this.bonus_collection[_5] = new ebg.stock();
                this.bonus_collection[_5].create(this, $("player_bonus_collection_" + _5), 30, 30);
                this.bonus_collection[_5].image_items_per_row = 10;
                this.bonus_collection[_5].setSelectionMode(0);
                this.bonus_collection[_5].order_items = false;
                for (var i = 1; i <= 10; i++) {
                    this.bonus_collection[_5].addItemType(i, i, g_gamethemeurl + "img/bonus_icons.png", i - 1);
                }
            }
            this.playerHand = new ebg.stock();
            this.playerHand.create(this, $("player_hand"), this.gameConstants.CARD_WIDTH, this.gameConstants.CARD_HEIGHT);
            this.playerHand.image_items_per_row = 9;
            this.playerHand.apparenceBorderWidth = "2px";
            this.playerHand.setOverlap(25, 5);
            if (this.isSpectator) {
                this.playerHand.selectable = 0;
            }
            this.playerPaddock = new ebg.stock();
            this.playerPaddock.create(this, $("player_paddock"), this.gameConstants.CARD_WIDTH, this.gameConstants.CARD_HEIGHT);
            this.playerPaddock.image_items_per_row = 9;
            this.playerPaddock.apparenceBorderWidth = "2px";
            this.playerPaddock.setOverlap(7, 7);
            if (this.isSpectator) {
                this.playerPaddock.selectable = 0;
                this.playerPaddock.setOverlap(0.1, 0.1);
                this.playerPaddock.item_margin = 0;
            }
            this.opponentHand = new ebg.stock();
            this.opponentHand.create(this, $("opponent_hand"), this.gameConstants.CARD_WIDTH, this.gameConstants.CARD_HEIGHT);
            this.opponentHand.image_items_per_row = 9;
            this.opponentHand.selectable = 0;
            this.opponentHand.order_items = false;
            this.opponentHand.next_item_id = 1000;
            this.opponentHand.setOverlap(25, 5);
            this.opponentPaddock = new ebg.stock();
            this.opponentPaddock.create(this, $("opponent_paddock"), this.gameConstants.CARD_WIDTH, this.gameConstants.CARD_HEIGHT);
            this.opponentPaddock.image_items_per_row = 9;
            this.opponentPaddock.selectable = 0;
            this.opponentPaddock.setOverlap(0.1, 0.1);
            this.opponentPaddock.item_margin = 0;
            this.market = new ebg.stock();
            this.market.create(this, $("market"), this.gameConstants.CARD_WIDTH, this.gameConstants.CARD_HEIGHT);
            this.market.image_items_per_row = 9;
            this.market.apparenceBorderWidth = "2px";
            this.market.order_items = false;
            dojo.connect(this.market, "onChangeSelection", this, "onMarketSelectionChanged");
            if (this.isSpectator) {
                this.market.selectable = 0;
            }
            this.discard = new ebg.stock();
            this.discard.create(this, $("discard"), this.gameConstants.CARD_WIDTH, this.gameConstants.CARD_HEIGHT);
            this.discard.selectable = 0;
            this.discard.setOverlap(0.1, 0.1);
            this.discard.item_margin = 0;
            this.discard.order_items = false;
            this.deck = new ebg.stock();
            this.deck.create(this, $("deck"), this.gameConstants.CARD_WIDTH, this.gameConstants.CARD_HEIGHT);
            this.deck.selectable = 0;
            this.deck.setOverlap(0.1, 0.1);
            this.deck.item_margin = 1;
            this.deck.order_items = false;
            for (var _8 in this.gamedatas.card_types) {
                var _9 = this.gamedatas.card_types[_8];
                var _a = _9.offset;
                this.playerHand.addItemType(_8, _9.weight, g_gamethemeurl + this.cardsSpriteImg, _a);
                this.playerPaddock.addItemType(_8, _9.weight, g_gamethemeurl + this.cardsSpriteImg, _a);
                this.opponentHand.addItemType(_8, _9.weight, g_gamethemeurl + this.cardsSpriteImg, _a);
                this.opponentPaddock.addItemType(_8, _9.weight, g_gamethemeurl + this.cardsSpriteImg, _a);
                this.market.addItemType(_8, _9.weight, g_gamethemeurl + this.cardsSpriteImg, _a);
                this.discard.addItemType(_8, _9.weight, g_gamethemeurl + this.cardsSpriteImg, _a);
                this.deck.addItemType(_8, _9.weight, g_gamethemeurl + this.cardsSpriteImg, _a);
            }
            this.playerHand.onItemCreate = dojo.hitch(this, "setupNewCard");
            this.playerPaddock.onItemCreate = dojo.hitch(this, "setupNewCard");
            this.market.onItemCreate = dojo.hitch(this, "setupNewCard");
            this.discard.onItemCreate = dojo.hitch(this, "setupNewCard");
            this.deck.onItemCreate = dojo.hitch(this, "setupNewCard");
            var _b;
            for (var i in _3.player_hand) {
                _b = _3.player_hand[i];
                console.log(_b);
                this.playerHand.addToStockWithId(_b.type, _b.id, "deck");
            }
            var _b;
            for (var i in _3.player_paddock) {
                _b = _3.player_paddock[i];
                console.log(_b);
                this.playerPaddock.addToStockWithId(_b.type, _b.id, "deck");
            }
            var _b;
            for (var i = 1; i <= _3.opponent_hand_count; i++) {
                this.opponentHand.addToStock("back", "deck");
            }
            var _b;
            for (var i in _3.opponent_paddock) {
                _b = _3.opponent_paddock[i];
                console.log(_b);
                this.opponentPaddock.addToStockWithId(_b.type, _b.id, "deck");
            }
            var _b;
            for (var i in _3.market) {
                _b = _3.market[i];
                console.log(_b);
                this.market.addToStockWithId(_b.type, _b.id, "deck");
            }
            var _b;
            for (var i in _3.discard) {
                _b = _3.discard[i];
                console.log(_b);
                this.discard.addToStockWithId(_b.type, _b.id, "deck");
            }
            this.setupSpreadTokens(_3.tokens_diamonds, _3.tokens_diamonds_order, $("token_diamonds_container"), 0, 0, false, true, 5);
            this.setupSpreadTokens(_3.tokens_gold, _3.tokens_gold_order, $("token_gold_container"), 0, 0, false, true, 5);
            this.setupSpreadTokens(_3.tokens_silver, _3.tokens_silver_order, $("token_silver_container"), 0, 0, false, true, 5);
            this.setupSpreadTokens(_3.tokens_cloth, _3.tokens_cloth_order, $("token_cloth_container"), 0, 0, false, true, 7);
            this.setupSpreadTokens(_3.tokens_spice, _3.tokens_spice_order, $("token_spice_container"), 0, 0, false, true, 7);
            this.setupSpreadTokens(_3.tokens_leather, _3.tokens_leather_order, $("token_leather_container"), 0, 0, false, true, 9);
            this.setupSpreadTokens(_3.tokens_camel, _3.tokens_camel_order, $("token_camel_container"), 0, 0, true, true, 1);
            this.setupSpreadTokens(_3.tokens_sale_3, _3.tokens_sale_3_order, $("token_sale_3_container"), 0, 0, true, true, 1);
            this.setupSpreadTokens(_3.tokens_sale_4, _3.tokens_sale_4_order, $("token_sale_4_container"), 0, 0, true, true, 1);
            this.setupSpreadTokens(_3.tokens_sale_5, _3.tokens_sale_5_order, $("token_sale_5_container"), 0, 0, true, true, 1);
            for (var i in _3.earned_seals) {
                var _c = _3.earned_seals[i];
                this.collection[_c.player_id].addToStock(1);
            }
            if (!this.isSpectator) {
                for (var i in _3.earned_bonus) {
                    var _d = _3.earned_bonus[i];
                    this.bonus_collection[_d.player_id].addToStock(_d.token_value);
                }
            }
            this.addTooltipToClass("ttseal", _("Seals of Excellency"), "");
            this.addTooltipToClass("ttrupies", _("Rupies"), "");
            this.addTooltipToClass("ttdiamonds", _("Diamonds tokens"), "");
            this.addTooltipToClass("ttgold", _("Gold tokens"), "");
            this.addTooltipToClass("ttsilver", _("Silver tokens"), "");
            this.addTooltipToClass("ttcloth", _("Cloth tokens"), "");
            this.addTooltipToClass("ttspice", _("Spice tokens"), "");
            this.addTooltipToClass("ttleather", _("Leather tokens"), "");
            this.addTooltipToClass("ttsales3", _("Three cards sale bonus tokens"), "");
            this.addTooltipToClass("ttsales4", _("Four cards sale bonus tokens"), "");
            this.addTooltipToClass("ttsales5", _("Five cards sale bonus tokens"), "");
            this.addTooltipToClass("ttcamel", _("Camel token"), "");
            this.updateCounters(_3.counters);
            this.setupSpreadDeckCards();
            setTimeout(dojo.hitch(this, "adjustDiscardAspect"), 1000);
            this.setupNotifications();
            console.log("Ending game setup");
        },
        setupSpreadTokens: function (_e, _f, _10, _11, _12, _13, _14, _15) {
            var _16 = _11 - (_13 === true ? 0 : this.gameConstants.TOKEN_WIDTH + this.gameConstants.TOKEN_SPREAD_X * (_15 - 1));
            var _17 = _12 - (_14 === true ? 0 : this.gameConstants.TOKEN_WIDTH + this.gameConstants.TOKEN_SPREAD_Y * (_15 - 1));
            var _18 = 0;
            for (var i in _f) {
                var _19 = _f[i];
                var _1a = _e[_19];
                var _1b = this.getTokenBgX(_1a.token_type, _1a.token_value);
                var _1c = _16 + (_13 === true ? 0 : _18 * this.gameConstants.TOKEN_SPREAD_X);
                var _1d = _17 + (_14 === true ? 0 : _18 * this.gameConstants.TOKEN_SPREAD_Y);
                dojo.place(this.format_block("jstpl_token", {
                    id: _19,
                    type: _1a.token_type,
                    value: _1a.token_value,
                    bg_x: _1b,
                    pos_x: _1c,
                    pos_y: _1d
                }), _10);
                _18++;
                this.setupNewToken($("token_" + _19), _1a.token_type, _19, _1a.token_value);
            }
        },
        setupSpreadDeckCards: function () {
            var _1e = this.gamedatas.counters["deck_cards_counter"].counter_value;
            for (var i = 0; i < _1e; i++) {
                var _1f = -i / 3;
                var _20 = -i / 3;
                dojo.place(this.format_block("jstpl_deck_card", {
                    id: i,
                    pos_x: _1f,
                    pos_y: _20
                }), $("deck"));
            }
        },
        removeDeckCardsInExcess: function () {
            var _21 = this.gamedatas.counters["deck_cards_counter"].counter_value;
            var _22 = dojo.query(".jpr_deck_card").length;
            for (var i = _21; i < _22; i++) {
                dojo.destroy("deck_card" + i);
            }
        },
        adjustDiscardAspect: function () {
            var _23 = this.discard.count();
            if (_23 == 0) {
                dojo.removeClass($("discard_subcontainer"), "discard_under_1");
                dojo.removeClass($("discard_subcontainer"), "discard_under_2");
                dojo.addClass($("discard_subcontainer"), "discard_under_0");
            }
            if (_23 == 2) {
                dojo.removeClass($("discard_subcontainer"), "discard_under_0");
                dojo.removeClass($("discard_subcontainer"), "discard_under_2");
                dojo.addClass($("discard_subcontainer"), "discard_under_1");
            }
            if (_23 > 2) {
                dojo.removeClass($("discard_subcontainer"), "discard_under_0");
                dojo.removeClass($("discard_subcontainer"), "discard_under_1");
                dojo.addClass($("discard_subcontainer"), "discard_under_2");
            }
        },
        getTokenBgX: function (_24, _25) {
            var _26 = 0;
            switch (_24) {
                case "diamonds":
                    _26 = 15 + (parseInt(_25) == 5 ? 1 : 2);
                    break;
                case "gold":
                    _26 = 13 + (parseInt(_25) == 5 ? 1 : 2);
                    break;
                case "silver":
                    _26 = 13;
                    break;
                case "cloth":
                    _26 = 8 + (parseInt(_25) == 5 ? 4 : parseInt(_25));
                    break;
                case "spice":
                    _26 = 4 + (parseInt(_25) == 5 ? 4 : parseInt(_25));
                    break;
                case "leather":
                    _26 = parseInt(_25);
                    break;
                case "seal":
                    _26 = 0;
                    break;
                case "camel_bonus":
                    _26 = 18;
                    break;
                case "sales_bonus_3":
                    _26 = 19;
                    break;
                case "sales_bonus_4":
                    _26 = 20;
                    break;
                case "sales_bonus_5":
                    _26 = 21;
                    break;
                default:
                    break;
            }
            return -1 * _26 * this.gameConstants.TOKEN_WIDTH;
        },
        onEnteringState: function (_27, _28) {
            console.log("Entering state: " + _27);
            switch (_27) {
                case "dummmy":
                    break;
            }
        },
        onLeavingState: function (_29) {
            console.log("Leaving state: " + _29);
            switch (_29) {
                case "dummmy":
                    break;
            }
        },
        onUpdateActionButtons: function (_2a, _2b) {
            console.log("onUpdateActionButtons: " + _2a);
            if (this.isCurrentPlayerActive()) {
                switch (_2a) {
                    case "playerTakeOrSell":
                        this.addActionButton("action_take", _("Take"), "onTakeCards");
                        this.addActionButton("action_sell", _("Sell"), "onSellCards");
                        this.addActionButton("action_trade", _("Trade"), "onTradeCards");
                        break;
                    case "playerDiscardCardsInExcess":
                        this.addActionButton("action_discard", _("Discard"), "onDiscard");
                        break;
                }
            }
        },
        onMarketSelectionChanged: function (_2c, _2d) {
            if (this.market.isSelected(_2d)) {
                if (this.market.getItemTypeById(_2d) == "camel") {
                    this.market.unselectItemsByType("leather");
                    this.market.unselectItemsByType("spice");
                    this.market.unselectItemsByType("cloth");
                    this.market.unselectItemsByType("silver");
                    this.market.unselectItemsByType("gold");
                    this.market.unselectItemsByType("diamonds");
                    this.market.selectItemsByType("camel");
                } else {
                    this.market.unselectItemsByType("camel");
                }
            } else {
                if (this.market.getItemTypeById(_2d) == "camel") {
                    this.market.unselectItemsByType("camel");
                }
            }
        },
        onTradeCards: function (evt) {
            console.log("onTradeCards");
            evt.preventDefault();
            if (!this.checkAction("trade")) {
                return;
            }
            var _2e = this.market.getSelectedItems();
            var _2f = this.playerHand.getSelectedItems();
            var _30 = this.playerPaddock.getSelectedItems();
            if (_2e.length < 2) {
                this.showMessage(_("You must select at least two card from the market"), "error");
                return;
            }
            if (_2f.length + _30.length < 2) {
                this.showMessage(_("You must select at least two card from your hand or paddock"), "error");
                return;
            }
            var _31 = "";
            for (var i in _2e) {
                _31 += _2e[i].id + ";";
            }
            var _32 = "";
            for (var i in _2f) {
                _32 += _2f[i].id + ";";
            }
            var _33 = "";
            for (var i in _30) {
                _33 += _30[i].id + ";";
            }
            this.ajaxcall("/jaipur/jaipur/tradeCards.html", {
                cardsMarket: _31,
                cardsHand: _32,
                cardsPaddock: _33,
                lock: true
            }, this, function (_34) {
                this.playerHand.unselectAll();
                this.market.unselectAll();
                this.playerPaddock.unselectAll();
            }, function (_35) {
                this.playerHand.unselectAll();
                this.market.unselectAll();
                this.playerPaddock.unselectAll();
            });
        },
        onTakeCards: function (evt) {
            console.log("onTakeCards");
            evt.preventDefault();
            if (!this.checkAction("take")) {
                return;
            }
            var _36 = this.market.getSelectedItems();
            var _37 = this.playerHand.getSelectedItems();
            var _38 = this.playerPaddock.getSelectedItems();
            if (_36.length == 0) {
                this.showMessage(_("You must select at least one card from the market"), "error");
                return;
            }
            var _39 = "";
            for (var i in _36) {
                _39 += _36[i].id + ";";
            }
            var _3a = "";
            for (var i in _37) {
                _3a += _37[i].id + ";";
            }
            var _3b = "";
            for (var i in _38) {
                _3b += _38[i].id + ";";
            }
            this.ajaxcall("/jaipur/jaipur/takeCards.html", {
                cardsMarket: _39,
                cardsHand: _3a,
                cardsPaddock: _3b,
                lock: true
            }, this, function (_3c) {
                this.playerHand.unselectAll();
                this.market.unselectAll();
                this.playerPaddock.unselectAll();
            }, function (_3d) {
                this.playerHand.unselectAll();
                this.market.unselectAll();
                this.playerPaddock.unselectAll();
            });
        },
        onSellCards: function (evt) {
            console.log("onSellCards");
            evt.preventDefault();
            if (!this.checkAction("sell")) {
                return;
            }
            var _3e = this.market.getSelectedItems();
            var _3f = this.playerHand.getSelectedItems();
            var _40 = this.playerPaddock.getSelectedItems();
            if (_3e.length > 0) {
                this.showMessage(_("You cannot sell cards from the market"), "error");
                return;
            }
            if (_3f.length == 0) {
                this.showMessage(_("You must select at least one card in your hand"), "error");
                return;
            }
            if (_40.length > 0) {
                this.showMessage(_("You cannot sell your camels"), "error");
                return;
            }
            var _41 = "";
            for (var i in _3f) {
                _41 += _3f[i].id + ";";
            }
            var _42 = "";
            for (var i in _40) {
                _42 += _40[i].id + ";";
            }
            this.ajaxcall("/jaipur/jaipur/sellCards.html", {
                cardsHand: _41,
                cardsPaddock: _42,
                lock: true
            }, this, function (_43) {
                this.playerHand.unselectAll();
                this.market.unselectAll();
                this.playerPaddock.unselectAll();
            }, function (_44) {
                this.playerHand.unselectAll();
                this.market.unselectAll();
                this.playerPaddock.unselectAll();
            });
        },
        onDiscard: function (evt) {
            console.log("onDiscard");
            evt.preventDefault();
            if (!this.checkAction("discard")) {
                return;
            }
            var _45 = this.playerHand.getSelectedItems();
            if (_45.length == 0) {
                this.showMessage(_("You must select at least one card in your hand"), "error");
                return;
            }
            var _46 = "";
            for (var i in _45) {
                _46 += _45[i].id + ";";
            }
            this.ajaxcall("/jaipur/jaipur/discard.html", {
                cardsHand: _46,
                lock: true
            }, this, function (_47) {
                this.playerHand.unselectAll();
            }, function (_48) {
                this.playerHand.unselectAll();
            });
        },
        setupNotifications: function () {
            console.log("**** Notifications : subscriptions setup");
            dojo.subscribe("cardsTaken", this, "notif_cardsTaken");
            dojo.subscribe("cardsSold", this, "notif_cardsSold");
            dojo.subscribe("camelBonusEarned", this, "notif_camelBonusEarned");
            this.notifqueue.setSynchronous("camelBonusEarned", 1000);
            dojo.subscribe("playerEarnings", this, "notif_playerEarnings");
            this.notifqueue.setSynchronous("playerEarnings", 1000);
            dojo.subscribe("sealEarned", this, "notif_sealEarned");
            this.notifqueue.setSynchronous("sealEarned", 1000);
            dojo.subscribe("newRound", this, "notif_newRound");
            this.notifqueue.setSynchronous("newRound", 1000);
            dojo.subscribe("newRoundSpectator", this, "notif_newRoundSpectator");
            dojo.subscribe("roundResult", this, "notif_roundResult");
            dojo.subscribe("updateCounters", this, "notif_updateCounters");
            dojo.subscribe("wait2000", this, "notif_wait2000");
            this.notifqueue.setSynchronous("wait2000", 2000);
        },
        notif_roundResult: function (_49) {
            console.log("**** Notification : roundResult");
            console.log(_49);
            this.displayTableWindow("endRound", _49.args.title, _49.args.datagrid, _49.args.header);
        },
        notif_wait2000: function (_4a) {
            console.log("**** Notification : notif_wait2000");
        },
        notif_newRoundSpectator: function (_4b) {
            console.log("**** Notification : notif_newRound");
            console.log(_4b);
            if (this.isSpectator) {
                this.notif_newRound(_4b);
            }
        },
        notif_newRound: function (_4c) {
            console.log("**** Notification : notif_newRound");
            console.log(_4c);
            var _4d = dojo.query(".jpr_token");
            for (var i = 0; i < _4d.length; i++) {
                if (!dojo.hasClass(_4d[i], "token_seal")) {
                    dojo.destroy(_4d[i]);
                }
            }
            var _4e = this.playerHand.getAllItems();
            for (var i in _4e) {
                _4f = _4e[i];
                var _50 = $("player_hand_item_" + _4f.id);
                if (_50) {
                    from = _50;
                    this.playerHand.removeFromStockById(_4f.id, "deck");
                }
            }
            var _4e = this.playerPaddock.getAllItems();
            for (var i in _4e) {
                _4f = _4e[i];
                var _50 = $("player_paddock_item_" + _4f.id);
                if (_50) {
                    from = _50;
                    this.playerPaddock.removeFromStockById(_4f.id, "deck");
                }
            }
            var _4e = this.opponentHand.getAllItems();
            for (var i in _4e) {
                _4f = _4e[i];
                var _50 = $("opponent_hand_item_" + _4f.id);
                if (_50) {
                    from = _50;
                    this.opponentHand.removeFromStockById(_4f.id, "deck");
                }
            }
            this.opponentHand.next_item_id = 1000;
            var _4e = this.opponentPaddock.getAllItems();
            for (var i in _4e) {
                _4f = _4e[i];
                var _50 = $("opponent_paddock_item_" + _4f.id);
                if (_50) {
                    from = _50;
                    this.opponentPaddock.removeFromStockById(_4f.id, "deck");
                }
            }
            var _4e = this.market.getAllItems();
            for (var i in _4e) {
                _4f = _4e[i];
                var _50 = $("market_item_" + _4f.id);
                if (_50) {
                    from = _50;
                    this.market.removeFromStockById(_4f.id, "deck");
                }
            }
            var _4e = this.discard.getAllItems();
            for (var i in _4e) {
                _4f = _4e[i];
                var _50 = $("discard_item_" + _4f.id);
                if (_50) {
                    from = _50;
                    this.discard.removeFromStockById(_4f.id, "deck");
                }
            }
            this.opponentPaddock.setOverlap(0.1, 0.1);
            this.opponentPaddock.item_margin = 0;
            if (this.isSpectator) {
                this.playerPaddock.setOverlap(0.1, 0.1);
                this.playerPaddock.item_margin = 0;
            }
            this.bonus_collection[_4c.args.player_id].removeAll();
            this.bonus_collection[_4c.args.opponent_id].removeAll();
            dojo.style("player_bonus_collection_" + _4c.args.player_id, "height", "0px");
            dojo.style("player_bonus_collection_" + _4c.args.opponent_id, "height", "0px");
            $("rupiescount_" + _4c.args.opponent_id).innerHTML = "?";
            if (this.isSpectator) {
                $("rupiescount_" + _4c.args.player_id).innerHTML = "?";
            }
            var _51 = _4c.args.player_hand;
            var _52 = _4c.args.player_paddock;
            var _53 = _4c.args.opponent_hand_count;
            var _54 = _4c.args.opponent_paddock;
            if (this.isSpectator && _4c.args.player_id != this.gamedatas.spectator_alias) {
                _51 = _4c.args.opponent_hand;
                _52 = _4c.args.opponent_paddock;
                _53 = _4c.args.player_hand.length;
                _54 = _4c.args.player_paddock;
            }
            var _4f;
            for (var i in _51) {
                _4f = _51[i];
                this.playerHand.addToStockWithId(_4f.type, _4f.id, "deck");
            }
            var _4f;
            for (var i in _52) {
                _4f = _52[i];
                this.playerPaddock.addToStockWithId(_4f.type, _4f.id, "deck");
            }
            var _4f;
            for (var i = 1; i <= _53; i++) {
                this.opponentHand.addToStock("back", "deck");
            }
            var _4f;
            for (var i in _54) {
                _4f = _54[i];
                this.opponentPaddock.addToStockWithId(_4f.type, _4f.id, "deck");
            }
            var _4f;
            for (var i in _4c.args.market) {
                _4f = _4c.args.market[i];
                this.market.addToStockWithId(_4f.type, _4f.id, "deck");
            }
            this.setupSpreadTokens(_4c.args.tokens.tokens_diamonds, _4c.args.tokens.tokens_diamonds_order, $("token_diamonds_container"), 0, 0, false, true, 5);
            this.setupSpreadTokens(_4c.args.tokens.tokens_gold, _4c.args.tokens.tokens_gold_order, $("token_gold_container"), 0, 0, false, true, 5);
            this.setupSpreadTokens(_4c.args.tokens.tokens_silver, _4c.args.tokens.tokens_silver_order, $("token_silver_container"), 0, 0, false, true, 5);
            this.setupSpreadTokens(_4c.args.tokens.tokens_cloth, _4c.args.tokens.tokens_cloth_order, $("token_cloth_container"), 0, 0, false, true, 7);
            this.setupSpreadTokens(_4c.args.tokens.tokens_spice, _4c.args.tokens.tokens_spice_order, $("token_spice_container"), 0, 0, false, true, 7);
            this.setupSpreadTokens(_4c.args.tokens.tokens_leather, _4c.args.tokens.tokens_leather_order, $("token_leather_container"), 0, 0, false, true, 9);
            this.setupSpreadTokens(_4c.args.tokens.tokens_camel, _4c.args.tokens.tokens_camel_order, $("token_camel_container"), 0, 0, true, true, 1);
            this.setupSpreadTokens(_4c.args.tokens.tokens_sale_3, _4c.args.tokens.tokens_sale_3_order, $("token_sale_3_container"), 0, 0, true, true, 1);
            this.setupSpreadTokens(_4c.args.tokens.tokens_sale_4, _4c.args.tokens.tokens_sale_4_order, $("token_sale_4_container"), 0, 0, true, true, 1);
            this.setupSpreadTokens(_4c.args.tokens.tokens_sale_5, _4c.args.tokens.tokens_sale_5_order, $("token_sale_5_container"), 0, 0, true, true, 1);
            this.updateCounters(_4c.args.counters);
            this.setupSpreadDeckCards();
            setTimeout(dojo.hitch(this, "adjustDiscardAspect"), 1000);
        },
        notif_sealEarned: function (_55) {
            console.log("**** Notification : notif_sealEarned");
            console.log(_55);
            var _56 = _55.args.player_id;
            this.collection[_56].addToStock(1);
            this.scoreCtrl[_56].incValue(1);
            this.updateCounters(_55.args.counters);
        },
        notif_playerEarnings: function (_57) {
            console.log("**** Notification : notif_playerEarnings");
            console.log(_57);
            $("rupiescount_" + _57.args.player_id).innerHTML = _57.args.rupies_count;
            for (var i in _57.args.earned_bonus) {
                var _58 = _57.args.earned_bonus[i];
                if (_58.player_id != this.player_id) {
                    this.bonus_collection[_58.player_id].addToStock(_58.token_value);
                }
            }
            this.updateCounters(_57.args.counters);
        },
        notif_updateCounters: function (_59) {
            console.log("**** Notification : notif_updateCounters");
            console.log(_59);
            if (!this.isSpectator && _59.args.token_value > 0) {
                this.bonus_collection[this.player_id].addToStock(_59.args.token_value);
            }
            this.updateCounters(_59.args.counters);
        },
        notif_camelBonusEarned: function (_5a) {
            console.log("**** Notification : notif_camelBonusEarned");
            console.log(_5a);
            this.opponentPaddock.setOverlap(7, 7);
            this.opponentPaddock.item_margin = 5;
            this.opponentPaddock.updateDisplay();
            if (this.isSpectator) {
                this.playerPaddock.setOverlap(7, 7);
                this.playerPaddock.item_margin = 5;
                this.playerPaddock.updateDisplay();
            }
            var _5b = _5a.args.player_id;
            if (_5b !== null) {
                this.moveTokensToPlayerPanel(_5a.args.tokensEarned, _5b);
                this.updateCounters(_5a.args.counters);
            }
        },
        notif_cardsSold: function (_5c) {
            console.log("**** Notification : notif_cardsSold");
            console.log(_5c);
            var _5d = _5c.args.player_id;
            var _5e;
            var _5f;
            var _60;
            var _61;
            var _62;
            var _63;
            if (_5d == this.player_id || (this.isSpectator && _5d == this.gamedatas.spectator_alias)) {
                for (var i in _5c.args.cardsFromHand) {
                    _5e = _5c.args.cardsFromHand[i];
                    _63 = $("overall_player_board_" + _5d);
                    var _64 = $("player_hand_item_" + _5e.id);
                    if (_64) {
                        _63 = _64;
                        this.playerHand.removeFromStockById(_5e.id);
                    }
                    this.discard.addToStockWithId(_5e.type, _5e.id, _63);
                }
            } else {
                _60 = this.opponentHand.getAllItems();
                _61 = _60.length;
                _62 = 1;
                for (var i in _5c.args.cardsFromHand) {
                    _5e = _5c.args.cardsFromHand[i];
                    _5f = _60[_61 - _62];
                    _63 = $("overall_player_board_" + _5d);
                    var _64 = $("opponent_hand_item_" + _5f.id);
                    if (_64) {
                        _63 = _64;
                        this.opponentHand.removeFromStockById(_5f.id);
                    }
                    this.discard.addToStockWithId(_5e.type, _5e.id, _63);
                    _62++;
                }
            }
            this.moveTokensToPlayerPanel(_5c.args.tokensEarned, _5d);
            this.updateCounters(_5c.args.counters);
            setTimeout(dojo.hitch(this, "adjustDiscardAspect"), 1000);
            dojo.query(".ttl0").forEach(function (_65) {
                var _66 = dojo.fadeOut({
                    node: _65.parentNode.parentNode,
                    duration: 1000
                }).play();
                dojo.connect(_66, "onEnd", function (_67) {
                    dojo.destroy(_67);
                });
                _66.play();
            });
            dojo.query(".ttl1").forEach(function (_68) {
                dojo.removeClass(_68, "ttl1");
                dojo.addClass(_68, "ttl0");
            });
        },
        notif_cardsTaken: function (_69) {
            console.log("**** Notification : notif_cardsTaken");
            console.log(_69);
            var _6a = _69.args.player_id;
            var _6b;
            var _6c;
            var _6d;
            var _6e;
            var _6f;
            var _70;
            if (_6a == this.player_id || (this.isSpectator && _6a == this.gamedatas.spectator_alias)) {
                for (var i in _69.args.cardsFromMarket) {
                    _6b = _69.args.cardsFromMarket[i];
                    _70 = $("overall_player_board_" + _6a);
                    var _71 = $("market_item_" + _6b.id);
                    if (_71) {
                        _70 = _71;
                        this.market.removeFromStockById(_6b.id);
                    }
                    if (_69.args.nbrCamels > 0) {
                        this.playerPaddock.addToStockWithId(_6b.type, _6b.id, _70);
                    } else {
                        if (this.isSpectator) {
                            _6b.type = "back";
                            _6b.weight = 0;
                        }
                        this.playerHand.addToStockWithId(_6b.type, _6b.id, _70);
                    }
                }
                for (var i in _69.args.cardsFromHand) {
                    _6b = _69.args.cardsFromHand[i];
                    _70 = $("overall_player_board_" + _6a);
                    var _71 = $("player_hand_item_" + _6b.id);
                    if (_71) {
                        _70 = _71;
                        this.playerHand.removeFromStockById(_6b.id);
                    }
                    this.market.addToStockWithId(_6b.type, _6b.id, _70);
                }
                for (var i in _69.args.cardsFromPaddock) {
                    _6b = _69.args.cardsFromPaddock[i];
                    _70 = $("overall_player_board_" + _6a);
                    var _71 = $("player_paddock_item_" + _6b.id);
                    if (_71) {
                        _70 = _71;
                        this.playerPaddock.removeFromStockById(_6b.id);
                    }
                    this.market.addToStockWithId(_6b.type, _6b.id, _70);
                }
            } else {
                _6d = this.opponentHand.getAllItems();
                _6e = _6d.length;
                _6f = 0;
                for (var i in _69.args.cardsFromHand) {
                    _6b = _69.args.cardsFromHand[i];
                    _6c = _6d[_6f];
                    _70 = $("overall_player_board_" + _6a);
                    var _71 = $("opponent_hand_item_" + _6c.id);
                    if (_71) {
                        _70 = _71;
                        this.opponentHand.removeFromStockById(_6c.id);
                    }
                    this.market.addToStockWithId(_6b.type, _6b.id, _70);
                    _6f++;
                }
                for (var i in _69.args.cardsFromPaddock) {
                    _6b = _69.args.cardsFromPaddock[i];
                    _70 = $("overall_player_board_" + _6a);
                    var _71 = $("opponent_paddock_item_" + _6b.id);
                    if (_71) {
                        _70 = _71;
                        this.opponentPaddock.removeFromStockById(_6b.id);
                    }
                    this.market.addToStockWithId(_6b.type, _6b.id, _70);
                }
                for (var i in _69.args.cardsFromMarket) {
                    _6b = _69.args.cardsFromMarket[i];
                    _70 = $("overall_player_board_" + _6a);
                    var _71 = $("market_item_" + _6b.id);
                    if (_71) {
                        _70 = _71;
                        this.market.removeFromStockById(_6b.id);
                    }
                    if (_69.args.nbrCamels > 0) {
                        this.opponentPaddock.addToStockWithId(_6b.type, _6b.id, _70);
                    } else {
                        this.opponentHand.addToStockWithId(_6b.type, _6b.id, _70);
                    }
                }
                setTimeout(dojo.hitch(this, "showBackInOpponentHand"), 1100);
            }
            for (var i in _69.args.newCardsToMarket) {
                _6b = _69.args.newCardsToMarket[i];
                _70 = $("deck");
                this.market.addToStockWithId(_6b.type, _6b.id, _70);
            }
            this.updateCounters(_69.args.counters);
            this.removeDeckCardsInExcess();
            dojo.query(".ttl0").forEach(function (_72) {
                var _73 = dojo.fadeOut({
                    node: _72.parentNode.parentNode,
                    duration: 1000
                }).play();
                dojo.connect(_73, "onEnd", function (_74) {
                    dojo.destroy(_74);
                });
                _73.play();
            });
            dojo.query(".ttl1").forEach(function (_75) {
                dojo.removeClass(_75, "ttl1");
                dojo.addClass(_75, "ttl0");
            });
        },
        showBackInOpponentHand: function () {
            var _76 = this.opponentHand.getAllItems();
            var _77;
            for (var i in _76) {
                var _78 = _76[i];
                if (_78.type != "back") {
                    _77 = $("opponent_hand_item_" + _78.id);
                    this.opponentHand.removeFromStockById(_78.id);
                    this.opponentHand.addToStock("back", _77);
                }
            }
        },
        setupNewCard: function (_79, _7a, _7b) {
            var _7c = this.gamedatas.card_types[_7a];
            if (_7c.type != "back") {
                var _7d = "<b>" + _(_7c.name) + "</b><hr/>";
                this.addTooltip(_79.id, _7d, _("Select/Unselect this card for playing"));
            }
        },
        setupNewToken: function (_7e, _7f, _80, _81) {
            var _82 = this.gamedatas.token_types[_7f];
            var _83 = "<b>" + _(_82.name) + "</b>";
            if (_81 != 0) {
                _83 += " (" + _81 + " " + _("rupies") + ")";
            }
            if (_82.type == "sales_bonus_3") {
                _83 += " (2×1 " + _("rupie") + ", 3×2 " + _("rupies") + ", 2×3 " + _("rupies") + ")";
            }
            if (_82.type == "sales_bonus_4") {
                _83 += " (2×4 " + _("rupies") + ", 2×5 " + _("rupies") + ", 2×6 " + _("rupies") + ")";
            }
            if (_82.type == "sales_bonus_5") {
                _83 += " (2×8 " + _("rupies") + ", 1×9 " + _("rupies") + ", 2×10 " + _("rupies") + ")";
            }
            this.addTooltip(_7e.id, _83, "");
        },
        moveTokensToPlayerPanel: function (_84, _85) {
            var _86 = 0;
            for (var i in _84) {
                var _87 = _84[i];
                this.slideToObjectAndDestroy($("token_" + _87.token_id), $("overall_player_board_" + _85), 1500, _86);
                _86 += 300;
            }
        },
        dummy: function () {
            console.log("dummy");
        }
    });
});
