<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns="http://www.w3.org/1999/xhtml"
  exclude-result-prefixes="xsl"
>
	<xsl:template match="/*">
		<div>
			<xsl:apply-templates>
				<xsl:sort select="comment"/>
				<xsl:sort select="value"/>
			</xsl:apply-templates>
		</div>
	</xsl:template>

	<xsl:template match="*"/>

	<xsl:template match="data">
		<a href="/#{@name}" style="object-fit: fill; height: 100%; filter: brightness(0) invert(1);">
			<img src="proyectos/{@name}/logo.png" alt="" class="rounded logo" style="margin-block: .5rem;"/>
		</a>
	</xsl:template>
</xsl:stylesheet>