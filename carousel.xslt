<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns="http://www.w3.org/1999/xhtml">
	<xsl:import href="common.xslt"/>
	<xsl:param name="path"></xsl:param>
	<xsl:template match="/">
		<xsl:apply-templates mode="carousel" select=".">
			<xsl:with-param name="title">Galería</xsl:with-param>
			<xsl:with-param name="items" select="key('image','*')"/>
		</xsl:apply-templates>
	</xsl:template>

	<xsl:template match="*" mode="carousel">
		<xsl:param name="title" select="."/>
		<xsl:param name="items" select="."/>
		<div id="carousel_autoplay" class="carousel slide" data-bs-ride="carousel">
			<div class="carousel-inner">
				<xsl:for-each select="$items">
					<xsl:variable name="active">
						<xsl:if test="position()=1">active</xsl:if>
					</xsl:variable>
					<div class="carousel-item {$active}">
						<img src="..." class="d-block w-100" alt="..." style="height: 600px; object-fit: cover;">
							<xsl:apply-templates mode="image-src" select=".">
								<xsl:with-param name="path">
									<xsl:value-of select="$path"/>
								</xsl:with-param>
							</xsl:apply-templates>
						</img>
					</div>
				</xsl:for-each>
			</div>
			<button class="carousel-control-prev" type="button" data-bs-target="#carousel_autoplay" data-bs-slide="prev">
				<span class="carousel-control-prev-icon" aria-hidden="true"></span>
				<span class="visually-hidden">Previous</span>
			</button>
			<button class="carousel-control-next" type="button" data-bs-target="#carousel_autoplay" data-bs-slide="next">
				<span class="carousel-control-next-icon" aria-hidden="true"></span>
				<span class="visually-hidden">Next</span>
			</button>
		</div>
	</xsl:template>
</xsl:stylesheet>