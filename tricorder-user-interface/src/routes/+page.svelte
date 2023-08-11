<script lang='ts'>
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
</script>

<div id="div-cnt-1" class="card p-9 max-h-[600px] overflow-auto space-y-1">
	<h3 class="h3" data-toc-ignore>Welcome to the "Desktop Toolkit"</h3>
	<hr />
	<p>Called Tricorder in reference to the multi-purpose tool in Star Trek. This tool will help you perform tasks in your desktop much smarter.</p>
	<ul class="apps">
		<li>Click on "Clipboard" to recall the content of your recent 100 clipboard. Use Left arrow key (refresh), Enter/Click (copy)</li>
		<li>Click on "ToDo" to quickly store sticky notes and recall them later, so you don't forget the idea.</li>
		<li>Click on "CTRL+R" to copy text or commands commonly used into clipboard (mimic famous and powerfull linux CTRL+R).</li>
		<li>Click on "Timebox" to set a countdown and make sure you spend the right amount of time in a task. Once time is reached you will be notified.</li>		
	</ul>
	<p>More stuff coming...</p>
</div>

<style>
	#div-cnt-1 {
		position: relative;
		margin-left: 5%;
		margin-right: 5%;
		margin-top: 5%;
	}
	ul.apps {
 		list-style-type: circle;
		margin-left: 5%;
	}
</style>