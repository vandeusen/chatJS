$(function(){

	function clearHistory()
	{
		//clear old chat history
		$("#chatHistory").html("");

	}

	function loadHistory(chats){
		//load new chat history with items from chats array
		$.each(chats, (index,item) => {
			updateHistory(item.datetime,item.message,item.from);
		});
	}

	clearHistory();
	//call chat.getChatHistory with our new loadHistory function as callback
	chat.getChatHistory(loadHistory);


	function updateHistory(messageDateTime, newMessage, messageSender)
	{
		//add new message to chat history, clear input
		$("#chatHistory").append("<div class='chatMessage from_"+messageSender+"'><div class='messageHeader'>"+messageDateTime+" : "+messageSender+"</div><div class='messageText'>"+newMessage+"</div></div>");
		$("#chatInput").val("");
		$("#chatHistory").scrollTop($(this).height());
	}

	//register event listener for chatreceived event, sending chat object data
	chat.addListener('chatreceived', function(data){
		updateHistory(data.chat.datetime, data.chat.message, data.chat.from);
	});

	//add event handler for button click event to call sendChat to process user input
	$("#chatSubmit").click(function(){
		chat.sendChat($("#chatInput").val());	
	});
});