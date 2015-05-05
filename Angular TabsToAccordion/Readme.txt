Angular Accordion To Tab Directive: 
An angular directive that allows you to seamlessly integrate accordions on one breakpoint that will turn into tabs once a certain condition is true.

Tabs also work as an effective organisational aid, making it easy to divide your content up into manageable groups in order to avoid overwhelming visitors with a big chunk of information.
Accordions might seem very similar to tabs but they can be used to great effect for a range of different purposes.

As accordions can be used to hide content, which can then be displayed to the visitors at their own discretion, they are ideal for allowing readers to only focus on the content they are currently interested in viewing, and hiding everything else.

With this directive the content is easily adjustable to viewport.
In small resolutions it acts as an accordion and will be converted to tabs whenever the viewport width is greater than 768px.

INSTALL:
	Add jQuery, angular libraries
	Add styles that are provided with this package.
USAGE:
	Here is the general HTML used. You have two configuration options:

	In the event that you want to use something besides active, you can do so by changing the value here:

		open-heading="tab3" by specifying heading attribute or
		open-bg-panel="2" by specifying accordion tab number.

	If you want only accordion or collapse you can change the value here:
		type="ACCORDION" displays accordion
		type="COLLAPSE" displays collapse


HTML Structure:

	<bg-accordion type="ACCORDION" open-heading="tab3" open-bg-panel="2">
		<bg-accordion-group heading="Tab1" content="<a href='www.google.com'>Link1</a>"></bg-accordion-group>
		<bg-accordion-group heading="Tab2" content="Content2"></bg-accordion-group>
		<bg-accordion-group heading="Tab3" >Content3</bg-accordion-group>
		<bg-accordion-group heading="Tab4" content="Content4"></bg-accordion-group>
		<bg-accordion-group heading="Tab5" content="Content5"></bg-accordion-group>
	</bg-accordion>

BROWSER SUPPORT:
	IE9+
	Chrome20+
	Firefox15+
