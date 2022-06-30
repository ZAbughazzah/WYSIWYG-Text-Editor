// define vars
const container = document.getElementsByClassName('container')[0];
const toolbar = container.getElementsByClassName('toolbar')[0];
const buttons = toolbar.querySelectorAll('.editor-btn:not(.has-submenu)');

// add active tag event
document.addEventListener('selectionchange', selectionChange);

// add toolbar button actions
for(let i = 0; i < buttons.length; i++) {
    let button = buttons[i];

    button.addEventListener('click', function(e) {
        let action = this.dataset.action;

        switch(action) {
            case 'createLink':
                execLinkAction();
                break;
            default:
                execDefaultAction(action);
        }
    });
}

/**
 * This function executes all 'normal' actions
 */
function execDefaultAction(action) {
    document.execCommand(action, false);
}

/**
 * Sets the current selected format buttons active/inactive
 */
function selectionChange(e) {

    for(let i = 0; i < buttons.length; i++) {
        let button = buttons[i];

        // don't remove active class on code toggle button
        if(button.dataset.action === 'toggle-view') continue;

        button.classList.remove('active');
    }

    if(!childOf(window.getSelection().anchorNode.parentNode, container)) return false;

    parentTagActive(window.getSelection().anchorNode.parentNode);
}

/**
 * Checks if the passed child has the passed parent
 */
function childOf(child, parent) {
    return parent.contains(child);
}

/**
 * Sets the tag active that is responsible for the current element
 */
function parentTagActive(elem) {
    let toolbarButton;

    // active by tag names
    let tagName = elem.tagName.toLowerCase();
    toolbarButton = document.querySelectorAll(`.toolbar .editor-btn[data-tag-name="${tagName}"]`)[0];
    if(toolbarButton) {
        toolbarButton.classList.add('active');
    }

    // active by text-align
    let textAlign = elem.style.textAlign;
    toolbarButton = document.querySelectorAll(`.toolbar .editor-btn[data-style="textAlign:${textAlign}"]`)[0];
    if(toolbarButton) {
        toolbarButton.classList.add('active');
    }

    return parentTagActive(elem.parentNode);
}