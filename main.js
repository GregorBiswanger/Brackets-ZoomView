/*
 * Copyright (c) 2015 Gregor Biswanger. All rights reserved.
 * http://about.me/gregor.biswanger
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */

define(function (require, exports, module) {
    "use strict";

    var AppInit = brackets.getModule("utils/AppInit"),
        ViewCommandHandlers = brackets.getModule("view/ViewCommandHandlers"),
        DropdownButton = brackets.getModule("widgets/DropdownButton").DropdownButton,
        PreferencesManager = brackets.getModule("preferences/PreferencesManager"),
        zoomSelect = new DropdownButton("", [], function (item, index) {
            return item;
        });

    zoomSelect.$button.text(getTitleTextFromCurrentFontSize());
    zoomSelect.items = ["20 %", "50 %", "70 %", "100 %", "150 %", "200 %", "400 %"];
    zoomSelect.dropdownExtraClasses = "dropdown-status-bar";
    zoomSelect.$button.css("width", "auto");
    zoomSelect.$button.addClass("btn-status-bar");

    $(zoomSelect).on("select", function (e, value, index) {
        zoomSelect.$button.text(value);

        try {
            var fontSize = "12px";

            if (index === 0) {
                fontSize = "2.4px";
            } else if (index === 1) {
                fontSize = "6px";
            } else if (index === 2) {
                fontSize = "8.4px";
            } else if (index === 3) {
                fontSize = "12px";
            } else if (index === 4) {
                fontSize = "18px";
            } else if (index === 5) {
                fontSize = "24px";
            } else if (index === 6) {
                fontSize = "48px";
            }

            saveFontSize(fontSize);
            setButtonText(fontSize);
        } catch (error) {
            alert(error);
        }
    });

    $(ViewCommandHandlers).on("fontSizeChange", function () {
        var fontSize = ViewCommandHandlers.getFontSize();
        setButtonText(fontSize);
    });

    function getTitleTextFromCurrentFontSize(fontSize) {
        if (fontSize) {
            fontSize = fontSize.replace("px", "");
        } else {
            return "100 %";
        }

        return Math.round(100 / 12 * fontSize) + " %";
    }

    function setButtonText(fontSize) {
        zoomSelect.$button.text(getTitleTextFromCurrentFontSize(fontSize));
    }

    function saveFontSize(fontSize) {
        ViewCommandHandlers.setFontSize(fontSize);
    }

    AppInit.appReady(function () {
        $("#status-info").prepend(zoomSelect.$button);
    });
});